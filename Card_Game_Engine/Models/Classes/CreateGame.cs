using Card_Game_Engine.Models.Custom_Models.Create_Game;

namespace Card_Game_Engine.Models.Classes;

public class CreateGame
{
    public List<Rule> Rules { get; set; } = new();
    public List<Card> StartingDeck { get; set; } = new();
    public int StartingPosition { get; set; } = 0;
    public Dictionary<int, CreateGridItem> Grid { get; set; } = new();
    public int Width { get; set; }
    public int Height { get; set; }
}