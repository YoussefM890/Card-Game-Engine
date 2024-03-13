using System.Text;

namespace Card_Game_Engine.Models;

public class CardContainer
{
    public Dictionary<string, GridItem> Grid { get; set; } // Key is the grid ID

    public CardContainer()
    {
        Grid = new Dictionary<string, GridItem>();
        foreach (var positionId in Enumerable.Range(1, 10)
                     .SelectMany(n => new[] { "A", "B", "C", "D", "E", "F", "G" }.Select(letter => $"{letter}{n}")))
        {
            Grid[positionId] = new GridItem(positionId);
        }

        // Assuming you want to fill the G1 position with 52 cards
        var g1Item = Grid["G1"]; // Get the G1 GridItem
        for (int i = 1; i <= 52; i++) // Create and add 52 cards to the G1 position
        {
            g1Item.Cards.Add(new Card { Id = i });
        }
    }

    public override string ToString()
        {
            var builder = new StringBuilder();
            foreach (var position in Grid)
            {
                builder.AppendLine($"{position.Key}: [{string.Join(", ", position.Value.Cards.Select(card => $"Id: {card.Id}"))}]");
            }
            return builder.ToString();
        }
}