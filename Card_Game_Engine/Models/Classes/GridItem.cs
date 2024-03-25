namespace Card_Game_Engine.Models;

public class GridItem
{
    public GridItem(int id)
    {
        Id = id;
        Cards = new List<Card>();
    }

    public int Id { get; set; }
    public List<Card> Cards { get; set; } // Holds the cards at this grid position

    public GridItem DeepCopy()
    {
        var newGridItem = new GridItem(this.Id);
        foreach (var card in this.Cards)
        {
            newGridItem.Cards.Add(new Card(card.Id, card.Value, card.Suit, card.Name, card.IsFaceUp, card.IsPlayable));
        }

        return newGridItem;
    }
}