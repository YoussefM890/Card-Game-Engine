using Microsoft.AspNetCore.SignalR;

namespace Card_Game_Engine;

public class ConnectionController : Hub
{
    public override async Task OnConnectedAsync()
    {
        // Custom logic when a new client connects
        await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        // Custom logic when a client disconnects
        await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }

}