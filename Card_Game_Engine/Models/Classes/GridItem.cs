namespace Card_Game_Engine.Models;

public class GridItem
{
    public GridItem(string id)
    {
        Id = id;
        Cards = new List<Card>();
    }

    public string Id { get; set; } // e.g., "G1", "G4"
    public List<Card> Cards { get; set; } // Holds the cards at this grid position

    public GridItem DeepCopy()
    {
        var newGridItem = new GridItem(this.Id);
        foreach (var card in this.Cards)
        {
            newGridItem.Cards.Add(new Card { Id = card.Id });
        }

        return newGridItem;
    }
}