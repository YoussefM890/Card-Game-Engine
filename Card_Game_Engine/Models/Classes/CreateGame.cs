namespace Card_Game_Engine.Models.Classes;

public class CreateGame
{
    public List<Rule> Rules { get; set; }
    public List<Card> StartingDeck { get; set; }
    public int StartingPosition { get; set; }
}