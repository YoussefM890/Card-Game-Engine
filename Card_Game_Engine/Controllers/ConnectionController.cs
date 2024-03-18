using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;

namespace Card_Game_Engine;

public class ConnectionController : Hub
{
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

    public async Task ProcessRules(GameObject gameObject)
    {
        Console.WriteLine("ProcessRules called!");
        RuleService ruleService = new RuleService(gameObject.Rules);
        CardContainer cardContainer = ruleService.FireTriggerIfFound(TriggerEnum.GameStart);
        // CardContainer cardContainer = ruleService.ProcessRules();
        await Clients.All.SendAsync("ReceiveMessage", cardContainer);
    }
}