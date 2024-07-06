namespace Card_Game_Engine.Models.Classes;

public class Player
{
    // public RoleEnum Role { get; set; }

    public Player(string id)
    {
        Id = id;
        // Role = RoleEnum.Player;
    }

    public string Id { get; set; }
}