using Card_Game_Engine.Exceptions;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;
using Action = Card_Game_Engine.Models.Action;

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

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        var participants = this._roomsService.GetOtherUsersInTheSameRoom(Context.ConnectionId);
        _roomsService.RemoveUserIfInRoom(Context.ConnectionId);
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
            await Clients.Caller.SendAsync("ReceiveUserInfo", new UserInfo(roomId, RoleEnum.Player1, true));
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
            var userRole = _roomsService.JoinRoom(roomId, Context.ConnectionId);
            await Clients.Caller.SendAsync("ReceiveUserInfo", new UserInfo(roomId, userRole, false));
            var participants = this._roomsService.GetOtherUsersInTheSameRoom(Context.ConnectionId);
            foreach (var participant in participants)
            {
                await Clients.Client(participant.Id).SendAsync("UserJoinedRoom", Context.ConnectionId);
            }
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
        var participants = this._roomsService.GetOtherUsersInTheSameRoom(Context.ConnectionId);
        var removedUser = _roomsService.RemoveUserIfInRoom(Context.ConnectionId);
        foreach (var participant in participants.Where(p => p.Id != Context.ConnectionId))
        {
            if (removedUser!.IsRoomOwner)
            {
                await Clients.Client(participant.Id).SendAsync("ReceiveAlert",
                    new Alert("Room Owner Left The Room", AlertTypeEnum.Warning));
                await Clients.Client(participant.Id).SendAsync("ReceiveUserInfo", null);
            }
            else
            {
                await Clients.Client(participant.Id).SendAsync("ReceiveAlert",
                    new Alert("User Left The Room", AlertTypeEnum.Info));
            }
        }
    }

    public async Task CreateGame(CreateGame createGame)
    {
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        room!.UpdateRules(createGame.Rules);
        room.ManualTriggers = (createGame.ManualTriggers);
        room.CardContainerService.ClearAndCreateEmptyGrid(createGame.Width, createGame.Height, createGame.Grid);
        room.CardContainerService.SetStartingDeck(createGame.StartingDeck, createGame.StartingPosition);
        // Console.WriteLine(_databaseService.CardContainerService.ToString());
    }

    public async Task InvokeExplicitAction(Action action)
    {
        Console.WriteLine("InvokeExplicitAction called!");
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        room!.RuleService.ProcessActions(new List<Action> { action });
        var width = room.CardContainerService.GetWidth();
        var height = room.CardContainerService.GetHeight();
        var scores = room.UserService.GetScores();

        foreach (var user in room.Users)
        {
            var transferGrid = room.GetTransferGrid(user.Id);
            var manualTriggers = room.GetManualTriggersByUser(user.Id);
            GameObject gameObject = new(transferGrid, scores[0], scores[1], width, height, manualTriggers);
            await Clients.Client(user.Id).SendAsync("ReceiveGameObject", gameObject);
        }
    }

    public async Task InvokeExplicitTrigger(int triggerId)
    {
        // Console.WriteLine("InvokeExplicitTrigger called!");
        var room = _roomsService.GetRoomByUserId(Context.ConnectionId);
        room!.RuleService.FireTriggerIfFound(triggerId);
        var width = room.CardContainerService.GetWidth();
        var height = room.CardContainerService.GetHeight();
        var scores = room.UserService.GetScores();

        foreach (var user in room.Users)
        {
            var transferGrid = room.GetTransferGrid(user.Id);
            var manualTriggers = room.GetManualTriggersByUser(user.Id);
            GameObject gameObject = new(transferGrid, scores[0], scores[1], width, height, manualTriggers);
            await Clients.Client(user.Id).SendAsync("ReceiveGameObject", gameObject);
        }
    }
}