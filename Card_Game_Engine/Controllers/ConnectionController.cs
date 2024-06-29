using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine;

public class ConnectionController : Hub
{
    private CardContainer _cardContainer;
    private RuleService _ruleService;

    public ConnectionController(RuleService ruleService, CardContainer cardContainer)
    {
        _ruleService = ruleService;
        _cardContainer = cardContainer;
    }

    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task CreateGame(CreateGame createGame)
    {
        Console.WriteLine("Create called!");
        _ruleService.SetRules(createGame.Rules);
        _cardContainer.SetStartingDeck(createGame.StartingDeck, createGame.StartingPosition);
    }

    public async Task StartGame()
    {
        Console.WriteLine("StartGame called!");
        _ruleService.FireTriggerIfFound(TriggerEnum.GameStart);
        await Clients.All.SendAsync("ReceiveGameObject", _cardContainer);
    }

    public async Task InvokeExplicitAction(Action action)
    {
        Console.WriteLine("InvokeExplicitAction called!");
        _ruleService.ProcessActions(new List<Action> { action });
        await Clients.All.SendAsync("ReceiveGameObject", _cardContainer);
    }
}