using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Actions;
using Card_Game_Engine.Models.Enums.ParameterOptions;

namespace Card_Game_Engine.Functions;

public class ActionFunctions
{
    private readonly List<GridItem> _grid;
    private readonly List<User> _users;

    public ActionFunctions(List<GridItem> grid, List<User> users)
    {
        _grid = grid;
        _users = users;
    }

    public void MoveCards(MoveCardAction action)
    {
        if (_grid.Count() < action.FromPosition || _grid.Count() < action.ToPosition)
        {
            throw new ArgumentException("Invalid grid ID.");
        }

        var fromGridItem = _grid[action.FromPosition];
        var toGridItem = _grid[action.ToPosition];

        int availableCards = fromGridItem.Cards.Count;
        int cardsToMove = Math.Min(availableCards, action.CardCount);

        if (cardsToMove < action.CardCount)
        {
            Console.WriteLine(
                $"Warning: Only {cardsToMove} cards available to move from {action.FromPosition} to {action.ToPosition}, less than the requested {action.CardCount}.");
            //maybe add a logic to warn the user
        }

        var movedCards = fromGridItem.Cards.Take(cardsToMove).ToList();
        fromGridItem.Cards.RemoveRange(0, cardsToMove);

        movedCards.Reverse();
        foreach (var card in movedCards)
        {
            //Warning: need to be careful that the two enums match the same visibility values when casting
            switch (action.CardVisibility)
            {
                case VisibilityOptionEnum.Keep:
                    if (card.Visibility == CardVisibilityEnum.Cell)
                        card.Visibility = (CardVisibilityEnum)toGridItem.Visibility;
                    //else keep the same visibility
                    break;
                case VisibilityOptionEnum.Cell:
                    card.Visibility = (CardVisibilityEnum)toGridItem.Visibility;
                    break;
                case VisibilityOptionEnum.Visible:
                    card.Visibility = CardVisibilityEnum.Visible;
                    break;
                case VisibilityOptionEnum.Hidden:
                    card.Visibility = CardVisibilityEnum.Hidden;
                    break;
                case VisibilityOptionEnum.Player1:
                    card.Visibility = CardVisibilityEnum.Player1;
                    break;
                case VisibilityOptionEnum.Player2:
                    card.Visibility = CardVisibilityEnum.Player2;
                    break;
            }

            toGridItem.Cards.Insert(0, card);
        }
    }
}