using Card_Game_Engine.Models.CreateGame.Classes;

namespace Card_Game_Engine.Models.Global.Classes;

// Extended version of RoomUserPlayer for frontend display
public class UserPlayerAssignmentDto
{
    public string UserId { get; set; }
    public string UserName { get; set; }
    public int? PlayerId { get; set; }
    public bool IsRoomOwner { get; set; }
}

public class GameObject
{
    public GameObject(List<GridTransferItem> grid, int? width = null, int? height = null,
        List<ManualTrigger>? manualTriggers = null,
        List<Player>? players = null,
        List<UserPlayerAssignmentDto>? userAssignments = null
    )
    {
        Grid = grid;
        Width = width;
        Height = height;
        ManualTriggers = manualTriggers ?? new List<ManualTrigger>();
        Players = players ?? new List<Player>();
        UserAssignments = userAssignments ?? new List<UserPlayerAssignmentDto>();
    }

    public List<GridTransferItem> Grid { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
    public List<ManualTrigger> ManualTriggers { get; set; }
    public List<Player> Players { get; set; }
    public List<UserPlayerAssignmentDto> UserAssignments { get; set; }
}