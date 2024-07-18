using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Controllers;

public class GameEngineController : Hub
{
    private DatabaseService _databaseService;

    // private CardContainer _cardContainer;
    private RuleService _ruleService;

    public GameEngineController(RuleService ruleService, DatabaseService databaseService)
    {
        _ruleService = ruleService;
        _databaseService = databaseService;
        // _cardContainer = cardContainer;
    }

    public override async Task OnConnectedAsync()
    {
        var connectionId = Context.ConnectionId;
        Console.WriteLine($"User connected with ConnectionId: {connectionId}");
        _databaseService.UserService.AddUser(connectionId);
        var users = _databaseService.GetUsers().ToList();
        for (int i = 0; i < users.Count; i++)
        {
            await Clients.Client(users[i].Id).SendAsync("GetUserNumber", i + 1);
        }

        await Clients.All.SendAsync("UserConnected", connectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        Console.WriteLine($"User disconnected with ConnectionId: {Context.ConnectionId}");
        _databaseService.UserService.RemoveUser(Context.ConnectionId);
        await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task CreateGame(CreateGame createGame)
    {
        Console.WriteLine("Create called!");
        _ruleService.SetRules(createGame.Rules);
        _databaseService.SetManualTriggers(createGame.ManualTriggers);
        _databaseService.CardContainerService.ClearAndCreateEmptyGrid(createGame.Width, createGame.Height,
            createGame.Grid);
        _databaseService.CardContainerService.SetStartingDeck(createGame.StartingDeck, createGame.StartingPosition);
        // Console.WriteLine(_databaseService.CardContainerService.ToString());
    }

    public async Task InvokeExplicitAction(Action action)
    {
        Console.WriteLine("InvokeExplicitAction called!");
        _ruleService.ProcessActions(new List<Action> { action });
        var width = _databaseService.CardContainerService.GetWidth();
        var height = _databaseService.CardContainerService.GetHeight();

        foreach (var user in _databaseService.GetUsers())
        {
            var transferGrid = _databaseService.GetTransferGrid(user.Id);
            var manualTriggers = _databaseService.GetManualTriggers(user.Id);
            GameObject gameObject = new(transferGrid, width, height, manualTriggers);
            await Clients.Client(user.Id).SendAsync("ReceiveGameObject", gameObject);
        }
    }

    public async Task InvokeExplicitTrigger(int triggerId)
    {
        Console.WriteLine("ExplicitTrigger called!");
        _ruleService.FireTriggerIfFound(triggerId);
        var width = _databaseService.CardContainerService.GetWidth();
        var height = _databaseService.CardContainerService.GetHeight();

        foreach (var user in _databaseService.GetUsers())
        {
            var transferGrid = _databaseService.GetTransferGrid(user.Id);
            var manualTriggers = _databaseService.GetManualTriggers(user.Id);
            GameObject gameObject = new(transferGrid, width, height, manualTriggers);
            await Clients.Client(user.Id).SendAsync("ReceiveGameObject", gameObject);
        }
    }
}