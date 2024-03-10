using Microsoft.AspNetCore.SignalR;

namespace Card_Game_Engine;

public class GameEngineController : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
    // public async Task CreateGame(GameOptions options)
    // {
        // await Clients.All.SendAsync("GameCreated", options);
    // }
}