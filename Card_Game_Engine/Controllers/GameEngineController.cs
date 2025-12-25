using Card_Game_Engine.Exceptions;
using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Enums;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;
using Action = Card_Game_Engine.Models.Global.Classes.Action;

namespace Card_Game_Engine.Controllers;

public class GameEngineController : Hub
{
    private RoomsService _roomsService;

    public GameEngineController(RoomsService roomService)
    {
        _roomsService = roomService;
    }

    public override async Task OnConnectedAsync()
    {
        var connectionId = Context.ConnectionId;
        Console.WriteLine($"User connected with ConnectionId: {connectionId}");
        await base.OnConnectedAsync();
    }

    public string GetConnectionId()
    {
        return Context.ConnectionId;
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        var participants = this._roomsService.GetOtherUsersInTheSameRoom(Context.ConnectionId);
        _roomsService.RemoveUserIfInRoom(Context.ConnectionId);

        // Broadcast updated room state to remaining users
        if (room != null && participants.Any())
        {
            await BroadcastRoomState(room);
        }

        foreach (var participant in participants)
        {
            await Clients.Client(participant.Id).SendAsync("UserDisconnected", Context.ConnectionId);
        }

        Console.WriteLine($"User disconnected with ConnectionId: {Context.ConnectionId}");
        await base.OnDisconnectedAsync(exception);
    }

    public async Task CreateRoom()
    {
        try
        {
            var roomId = _roomsService.CreateRoom(Context.ConnectionId);
            var room = _roomsService.GetRoomByUserId(Context.ConnectionId);

            await Clients.Caller.SendAsync("ReceiveUserInfo", new UserInfo(roomId, RoleEnum.Spectator, true));

            // Send initial room state
            await BroadcastRoomState(room!);
        }
        catch (MaxRoomsReachedException e)
        {
            await Clients.Caller.SendAsync("ReceiveAlert", new Alert(e.Message, AlertTypeEnum.Error));
        }
    }

    public async Task JoinRoom(string roomId)
    {
        try
        {
            _roomsService.JoinRoom(roomId, Context.ConnectionId);
            var room = _roomsService.GetRoomByUserId(Context.ConnectionId);

            // Send user info to the joining user
            await Clients.Caller.SendAsync("ReceiveUserInfo", new UserInfo(roomId));

            // Send game object to the joining user if game exists
            if (room!.Players.Any())
            {
                await BroadcastGameObjectToUser(room, Context.ConnectionId);
            }

            // Broadcast updated room state to all users in the room
            await BroadcastRoomState(room);
        }
        catch (RoomDoesNotExistException e)
        {
            await Clients.Caller.SendAsync("ReceiveAlert", new Alert(e.Message, AlertTypeEnum.Error));
        }
        catch (MaxUsersPerRoomException e)
        {
            await Clients.Caller.SendAsync("ReceiveAlert", new Alert(e.Message, AlertTypeEnum.Error));
        }
    }

    public async Task LeaveRoom()
    {
        Console.WriteLine("LeaveRoom called");
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        var removedUser = _roomsService.RemoveUserIfInRoom(Context.ConnectionId);

        if (removedUser!.IsRoomOwner)
        {
            // Room owner left - notify all remaining users
            var participants = room!.Users;
            foreach (var participant in participants)
            {
                await Clients.Client(participant.Id).SendAsync("ReceiveAlert",
                    new Alert("Room Owner Left The Room", AlertTypeEnum.Warning));
                await Clients.Client(participant.Id).SendAsync("ReceiveUserInfo", null);
            }
        }
        else
        {
            // Regular user left - broadcast updated room state
            await BroadcastRoomState(room!);
            await Clients.Caller.SendAsync("ReceiveAlert",
                new Alert("You left the room", AlertTypeEnum.Info));
        }
    }

    public async Task CreateGame(CreateGame createGame)
    {
        Console.WriteLine("CreateGame called");
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);

        // Initialize grid FIRST before setting starting deck
        room!.CardContainerService.ClearAndCreateEmptyGrid(createGame.Width, createGame.Height, createGame.Grid);

        // Now set the starting deck
        room.CardContainerService.SetStartingDeck(createGame.StartingDeck, createGame.StartingPosition);

        // Set other properties
        room.Players = createGame.Players;
        room.ManualTriggers = createGame.ManualTriggers;
        room.UpdateRules(createGame.Rules);

        // Broadcast updated room state AND game object (so players update in real-time)
        await BroadcastRoomState(room);
        await BroadcastGameObject(room);

        await Clients.Caller.SendAsync("ReceiveAlert",
            new Alert("Game updated successfully", AlertTypeEnum.Success));
    }

    public async Task InvokeExplicitAction(Action action)
    {
        Console.WriteLine("InvokeExplicitAction called!");
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        room!.RuleService.ProcessActions(new List<Action> { action }, Context.ConnectionId);
        var width = room.CardContainerService.GetWidth();
        var height = room.CardContainerService.GetHeight();
        var players = room.Players;
        var userAssignments = GetUserAssignments(room);

        foreach (var user in room.Users)
        {
            var transferGrid = room.GetTransferGrid(user.Id);
            var manualTriggers = room.GetManualTriggersByUser(user.Id);
            GameObject gameObject = new(transferGrid, width, height, manualTriggers, players, userAssignments);
            await Clients.Client(user.Id).SendAsync("ReceiveGameObject", gameObject);
        }
    }

    public async Task InvokeExplicitTrigger(int triggerId)
    {
        // Console.WriteLine("InvokeExplicitTrigger called!");
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        room!.RuleService.FireTriggerIfFound(triggerId, Context.ConnectionId);
        var width = room.CardContainerService.GetWidth();
        var height = room.CardContainerService.GetHeight();
        var players = room.Players;
        var userAssignments = GetUserAssignments(room);

        foreach (var user in room.Users)
        {
            var transferGrid = room.GetTransferGrid(user.Id);
            var manualTriggers = room.GetManualTriggersByUser(user.Id);
            GameObject gameObject = new(transferGrid, width, height, manualTriggers, players, userAssignments);
            await Clients.Client(user.Id).SendAsync("ReceiveGameObject", gameObject);
        }
    }

    public async Task AssignPlayerToUser(string userId, int playerId)
    {
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        var currentUser = room!.GetUser(Context.ConnectionId);

        // Only room owner can assign players
        if (currentUser == null || !currentUser.IsRoomOwner)
        {
            await Clients.Caller.SendAsync("ReceiveAlert",
                new Alert("Only the room owner can assign players", AlertTypeEnum.Error));
            return;
        }

        // Check if player exists
        var player = room.GetPlayer(playerId);
        if (player == null)
        {
            await Clients.Caller.SendAsync("ReceiveAlert",
                new Alert($"Player with ID {playerId} does not exist", AlertTypeEnum.Error));
            return;
        }

        // Check if user exists in room
        var targetUser = room.GetUser(userId);
        if (targetUser == null)
        {
            await Clients.Caller.SendAsync("ReceiveAlert",
                new Alert($"User not found in room", AlertTypeEnum.Error));
            return;
        }

        // Assign player
        room.AssignPlayerToUser(userId, playerId);

        // Broadcast updated room state AND game object
        await BroadcastRoomState(room);
        await BroadcastGameObject(room);
    }

    public async Task UnassignPlayerFromUser(string userId)
    {
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        var currentUser = room!.GetUser(Context.ConnectionId);

        // Only room owner can unassign players
        if (currentUser == null || !currentUser.IsRoomOwner)
        {
            await Clients.Caller.SendAsync("ReceiveAlert",
                new Alert("Only the room owner can unassign players", AlertTypeEnum.Error));
            return;
        }

        // Check if user exists in room
        var targetUser = room.GetUser(userId);
        if (targetUser == null)
        {
            await Clients.Caller.SendAsync("ReceiveAlert",
                new Alert($"User not found in room", AlertTypeEnum.Error));
            return;
        }

        // Unassign player
        room.UnassignPlayerFromUser(userId);

        // Broadcast updated room state AND game object
        await BroadcastRoomState(room);
        await BroadcastGameObject(room);
    }

    // Helper method to broadcast room state to all users
    private async Task BroadcastRoomState(Room room)
    {
        var roomState = room.GetRoomState();
        foreach (var user in room.Users)
        {
            await Clients.Client(user.Id).SendAsync("ReceiveRoomState", roomState);
        }
    }

    // Helper method to broadcast game object to all users
    private async Task BroadcastGameObject(Room room)
    {
        var width = room.CardContainerService.GetWidth();
        var height = room.CardContainerService.GetHeight();
        var players = room.Players;
        var userAssignments = GetUserAssignments(room);

        foreach (var user in room.Users)
        {
            var transferGrid = room.GetTransferGrid(user.Id);
            var manualTriggers = room.GetManualTriggersByUser(user.Id);
            GameObject gameObject = new(transferGrid, width, height, manualTriggers, players, userAssignments);
            await Clients.Client(user.Id).SendAsync("ReceiveGameObject", gameObject);
        }
    }

    // Helper method to send game object to a specific user
    private async Task BroadcastGameObjectToUser(Room room, string userId)
    {
        var width = room.CardContainerService.GetWidth();
        var height = room.CardContainerService.GetHeight();
        var players = room.Players;
        var userAssignments = GetUserAssignments(room);

        var transferGrid = room.GetTransferGrid(userId);
        var manualTriggers = room.GetManualTriggersByUser(userId);
        GameObject gameObject = new(transferGrid, width, height, manualTriggers, players, userAssignments);
        await Clients.Client(userId).SendAsync("ReceiveGameObject", gameObject);
    }

    // Helper method to get user assignments for GameObject (maps from existing RoomUserPlayer)
    private List<UserPlayerAssignmentDto> GetUserAssignments(Room room)
    {
        return room.Users.Select(user => new UserPlayerAssignmentDto
        {
            UserId = user.Id,
            UserName = user.Name,
            PlayerId = room.UserPlayerAssociations.FirstOrDefault(a => a.UserId == user.Id)?.PlayerId,
            IsRoomOwner = user.IsRoomOwner
        }).ToList();
    }
}