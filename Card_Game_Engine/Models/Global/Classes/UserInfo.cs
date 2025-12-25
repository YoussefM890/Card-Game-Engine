using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.Global.Classes;

public class UserInfo
{
    public UserInfo(string roomId, RoleEnum role = RoleEnum.Spectator, bool isRoomOwner = false, Player? player = null)
    {
        RoomId = roomId;
        Role = role;
        IsRoomOwner = isRoomOwner;
        Player = player;
    }

    public string Name { get; set; }
    public string RoomId { get; set; }
    public RoleEnum Role { get; set; }
    public bool IsRoomOwner { get; set; }
    public Player? Player { get; set; }
}