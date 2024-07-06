using Card_Game_Engine.Models;

namespace Card_Game_Engine.Functions;

public class ActionFunctions
{
    private readonly List<GridItem> Grid;

    public ActionFunctions(List<GridItem> grid)
    {
        Grid = grid;
    }

    public void MoveCards(int fromId, int toId, int numberOfCards)
    {
        if (Grid.Count() < fromId || Grid.Count() < toId)
        {
            throw new ArgumentException("Invalid grid ID.");
        }

        var fromGridItem = Grid[fromId];
        var toGridItem = Grid[toId];

        var cardsToMove = fromGridItem.Cards.Take(numberOfCards).ToList();
        fromGridItem.Cards.RemoveRange(0, numberOfCards);
        // adds the cards to the bottom of the destination grid item
        // toGridItem.Cards.AddRange(cardsToMove);
        cardsToMove.Reverse();
        foreach (var card in cardsToMove)
        {
            toGridItem.Cards.Insert(0, card);
        }
    }
}