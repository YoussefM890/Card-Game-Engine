using Card_Game_Engine.Models.Global.Classes;
using CreateNamespace = Card_Game_Engine.Models.CreateGame.Classes;

public class CreateGame
{
    public List<Rule> Rules { get; set; } = new();
    public List<CreateNamespace.Card> StartingDeck { get; set; } = new();
    public int StartingPosition { get; set; } = 0;
    public Dictionary<int, CreateNamespace.GridItem> Grid { get; set; } = new();
    public int Width { get; set; }
    public int Height { get; set; }
    public List<CreateNamespace.ManualTrigger> ManualTriggers { get; set; } = new();
    public List<Player> Players { get; set; } = new();
}