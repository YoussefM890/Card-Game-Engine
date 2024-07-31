using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Classes;

public class UserInfo
{
    public UserInfo(string roomId, RoleEnum role = RoleEnum.Spectator, bool isRoomOwner = false)
    {
        RoomId = roomId;
        Role = role;
        IsRoomOwner = isRoomOwner;
    }

    public string RoomId { get; set; }
    public RoleEnum Role { get; set; }
    public bool IsRoomOwner { get; set; }
}