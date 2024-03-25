using System.Text;

namespace Card_Game_Engine.Models;

public class CardContainer
{
    public CardContainer()
    {
        Grid = new List<GridItem>();
        foreach (var i in Enumerable.Range(1, 7)) // 7 rows
        {
            foreach (var j in Enumerable.Range(1, 12)) // 12 columns
            {
                Grid.Add(new GridItem(Grid.Count));
            }
        }

        var firstItem = Grid[1]; // Get the GridItem with index 1
        firstItem.Cards = Constants.DistinctCards;
    }

    public List<GridItem> Grid { get; set; } // Key is the grid ID


    public CardContainer DeepCopy()
    {
        var newContainer = new CardContainer();
        newContainer.Grid = this.Grid.Select(item => item.DeepCopy()).ToList();
        return newContainer;
    }

    public override string ToString()
    {
        var builder = new StringBuilder();
        foreach (var item in Grid)
        {
            builder.AppendLine(
                $"{item.Id}: [{string.Join(", ", item.Cards.Select(card => $"Id: {card.Id}"))}]");
        }

        return builder.ToString();
    }
}