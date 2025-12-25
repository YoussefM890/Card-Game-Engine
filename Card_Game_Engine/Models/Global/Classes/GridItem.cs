using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.Global.Classes;

public class GridItem
{
    public GridItem(int id, GridItemVisibility? visibility = null, List<int>? visibleTo = null)
    {
        Id = id;
        Cards = new List<Card>();
        Visibility = visibility ?? GridItemVisibility.Visible;
        VisibleTo = visibleTo ?? new List<int>();
    }

    public int Id { get; set; }
    public List<Card> Cards { get; set; } // Holds the cards at this grid position
    public GridItemVisibility Visibility { get; set; } // Is this grid item visible to the player
    public List<int> VisibleTo { get; set; }


    public GridItem DeepCopy()
    {
        var newGridItem = new GridItem(this.Id);
        foreach (var card in this.Cards)
        {
            newGridItem.Cards.Add(new Card(card.Id, card.FaceValue, card.Suit, card.Name, card.Visibility,
                card.IsPlayable));
        }

        return newGridItem;
    }
}