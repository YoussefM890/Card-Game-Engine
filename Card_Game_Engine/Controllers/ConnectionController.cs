using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;

namespace Card_Game_Engine;

public class ConnectionController : Hub
{
    private RuleService _ruleService;

    public ConnectionController(RuleService ruleService)
    {
        _ruleService = ruleService;
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

    public async Task SubmitRules(GameObject gameObject)
    {
        Console.WriteLine("SubmitRules called!");
        _ruleService.SetRules(gameObject.Rules);
    }

    public async Task StartGame()
    {
        Console.WriteLine("StartGame called!");
        CardContainer cardContainer = _ruleService.FireTriggerIfFound(TriggerEnum.GameStart);
        await Clients.All.SendAsync("ReceiveGameObject", cardContainer);
    }
}