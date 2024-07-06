using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Classes;

public class User
{
    public User(string id, RoleEnum role)
    {
        Id = id;
        Role = role;
    }

    public string Id { get; set; }
    public RoleEnum Role { get; set; }
}