using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Classes;

public class User
{
    public User(string id, bool isRoomOwner, RoleEnum role = RoleEnum.Spectator)
    {
        Id = id;
        IsRoomOwner = isRoomOwner;
        Role = role;
        JoinedAt = DateTime.Now;
    }

    public string Id { get; set; }
    public bool IsRoomOwner { get; set; }
    public RoleEnum Role { get; set; }
    public DateTime JoinedAt { get; set; }
}