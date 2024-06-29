using System.Text;

namespace Card_Game_Engine.Models;

public class CardContainer
{
    public CardContainer()
    {
    }

    public List<GridItem> Grid { get; set; } // Key is the grid ID

    public void SetStartingDeck(List<Card> startingDeck, int startingPosition = 0)
    {
        Grid = CreateEmptyGrid();
        Grid[startingPosition].Cards = startingDeck;
    }

    public CardContainer DeepCopy()
    {
        var newContainer = new CardContainer();
        newContainer.Grid = this.Grid.Select(item => item.DeepCopy()).ToList();
        return newContainer;
    }

    private List<GridItem> CreateEmptyGrid()
    {
        List<GridItem> grid = new();
        foreach (var i in Enumerable.Range(1, 7)) // 7 rows
        {
            foreach (var j in Enumerable.Range(1, 12)) // 12 columns
            {
                grid.Add(new GridItem(grid.Count));
            }
        }

        return grid;
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