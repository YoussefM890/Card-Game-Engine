using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine;

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
        await Clients.Caller.SendAsync("GetUserNumber", _databaseService.GetUsers().Count());
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
        _databaseService.CardContainerService.ClearAndCreateEmptyGrid(createGame.Width, createGame.Height);
        _databaseService.CardContainerService.SetStartingDeck(createGame.StartingDeck, createGame.StartingPosition);
        // Console.WriteLine(_databaseService.CardContainerService.ToString());
    }

    public async Task StartGame()
    {
        Console.WriteLine("StartGame called!");
        _ruleService.FireTriggerIfFound(TriggerEnum.GameStart);
        GameObject gameObject = new(_databaseService.GetGrid(), _databaseService.CardContainerService.GetWidth(),
            _databaseService.CardContainerService.GetHeight());
        await Clients.All.SendAsync("ReceiveGameObject", gameObject);
    }

    public async Task InvokeExplicitAction(Action action)
    {
        Console.WriteLine("InvokeExplicitAction called!");
        _ruleService.ProcessActions(new List<Action> { action });
        GameObject gameObject = new(_databaseService.GetGrid(), _databaseService.CardContainerService.GetWidth(),
            _databaseService.CardContainerService.GetHeight());
        await Clients.All.SendAsync("ReceiveGameObject", gameObject);
    }
}