using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.Global.Classes;

public class User
{
    public User(string id, bool isRoomOwner, string name, RoleEnum role = RoleEnum.Spectator)
    {
        Id = id;
        IsRoomOwner = isRoomOwner;
        Name = name;
        Role = role;
        JoinedAt = DateTime.Now;
    }

    public string Id { get; set; }
    public bool IsRoomOwner { get; set; }
    public string Name { get; set; }
    public RoleEnum Role { get; set; }
    public DateTime JoinedAt { get; set; }

    public User DeepCopy()
    {
        return new User(Id, IsRoomOwner, Name, Role)
        {
            JoinedAt = JoinedAt
        };
    }
}