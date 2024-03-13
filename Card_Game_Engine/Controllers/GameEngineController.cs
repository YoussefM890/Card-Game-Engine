using Card_Game_Engine.Models;
using Card_Game_Engine.Services;
using Microsoft.AspNetCore.SignalR;

namespace Card_Game_Engine;

public class GameEngineController : Hub
{
    private RuleService _ruleService;
    GameEngineController()
    {
        _ruleService = new RuleService();
    }
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

}