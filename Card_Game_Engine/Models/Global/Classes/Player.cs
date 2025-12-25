using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.Global.Classes;

public class Player
{
    public Player(int id, string role, string description, PerspectiveEnum perspective = PerspectiveEnum.Bottom,
        int score = 0)
    {
        Id = id;
        Role = role;
        Description = description;
        Perspective = perspective;
        Score = score;
    }

    public int Id { get; set; }
    public string Role { get; set; }
    public string Description { get; set; }
    public PerspectiveEnum Perspective { get; set; }
    public int Score { get; set; }

    public Player DeepCopy()
    {
        return new Player(Id, Role, Description, Perspective, Score);
    }

    public override string ToString()
    {
        return $"Player {Id}: {Role} (Score: {Score}, Perspective: {Perspective})";
    }
}