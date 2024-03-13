namespace Card_Game_Engine.Models;

public class GridItem
{
    public string Id { get; set; } // e.g., "G1", "G4"
    public List<Card> Cards { get; set; } // Holds the cards at this grid position

    public GridItem(string id)
    {
        Id = id;
        Cards = new List<Card>();
    }
}