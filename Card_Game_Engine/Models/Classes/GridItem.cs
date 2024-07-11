using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models;

public class GridItem
{
    public GridItem(int id, GridItemVisibility? visibility = null)
    {
        Id = id;
        Cards = new List<Card>();
        Visibility = visibility ?? GridItemVisibility.Visible;
    }

    public int Id { get; set; }
    public List<Card> Cards { get; set; } // Holds the cards at this grid position
    public GridItemVisibility Visibility { get; set; } // Is this grid item visible to the player


    public GridItem DeepCopy()
    {
        var newGridItem = new GridItem(this.Id);
        foreach (var card in this.Cards)
        {
            newGridItem.Cards.Add(new Card(card.Id, card.Value, card.Suit, card.Name, card.Visibility,
                card.IsPlayable));
        }

        return newGridItem;
    }
}