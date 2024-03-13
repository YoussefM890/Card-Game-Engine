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

    // Method to move cards between grid items
    public void MoveCards(string fromId, string toId, int numberOfCards)
    {
        if (!Grid.ContainsKey(fromId) || !Grid.ContainsKey(toId))
        {
            throw new ArgumentException("Invalid grid ID.");
        }

        var fromGridItem = Grid[fromId];
        var toGridItem = Grid[toId];

        var cardsToMove = fromGridItem.Cards.Take(numberOfCards).ToList();
        fromGridItem.Cards.RemoveRange(0, numberOfCards);
        toGridItem.Cards.AddRange(cardsToMove);
    }

    // Add additional methods for other actions as needed
}