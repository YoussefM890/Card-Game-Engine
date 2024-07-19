using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Actions;
using Card_Game_Engine.Models.Enums;
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
        foreach (var fromPosition in action.FromPositions)
        {
            if (_grid.Count() <= fromPosition || _grid.Count() <= action.ToPosition)
            {
                throw new ArgumentException("Invalid grid ID.");
            }

            var fromGridItem = _grid[fromPosition];
            var toGridItem = _grid[action.ToPosition];

            int availableCards = fromGridItem.Cards.Count;

            // if card count is 0, move all cards
            int cardsToMove = action.CardCount == 0 ? availableCards : Math.Min(availableCards, action.CardCount);

            if (cardsToMove < action.CardCount)
            {
                Console.WriteLine(
                    $"Warning: Only {cardsToMove} cards available to move from {fromPosition} to {action.ToPosition}, less than the requested {action.CardCount}.");
                // maybe add a logic to warn the user
            }

            var movedCards = fromGridItem.Cards.Take(cardsToMove).ToList();
            fromGridItem.Cards.RemoveRange(0, cardsToMove);

            movedCards.Reverse();
            foreach (var card in movedCards)
            {
                // Warning: need to be careful that the two enums match the same visibility values when casting
                switch (action.CardVisibility)
                {
                    case VisibilityOptionEnum.Keep:
                        if (card.Visibility == CardVisibilityEnum.Cell)
                            card.Visibility = (CardVisibilityEnum)toGridItem.Visibility;
                        // else keep the same visibility
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


    public void ShuffleDeck(int position)
    {
        if (_grid.Count() < position)
        {
            throw new ArgumentException("Invalid grid ID.");
        }

        var gridItem = _grid[position];
        var shuffledCards = gridItem.Cards.OrderBy(x => Guid.NewGuid()).ToList();
        gridItem.Cards.Clear();
        gridItem.Cards.AddRange(shuffledCards);
    }
}