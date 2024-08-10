using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Actions;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Models.Enums.ParameterOptions.ActionOptions;

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
        // Handle moving cards
        List<int> fromPositions = action.FromPositions ?? new List<int> { action.FromPosition!.Value };
        List<int> toPositions = action.ToPositions ?? new List<int> { action.ToPosition!.Value };
        List<Card> movedCards = new();


        foreach (var fromPosition in fromPositions)
        {
            var fromGridItem = _grid[fromPosition];
            int requestedCount = action.CardCount * toPositions.Count;
            int availableCards = fromGridItem.Cards.Count;
            // if card count is 0, move all cards
            int cardsToMove = requestedCount == 0
                ? availableCards
                : Math.Min(availableCards, requestedCount);
            if (cardsToMove < requestedCount)
            {
                Console.WriteLine(
                    $"Warning: Only {cardsToMove} cards available to move from {fromPosition}, less than the requested {requestedCount}.");
            }

            movedCards.AddRange(fromGridItem.Cards.Take(cardsToMove));
            fromGridItem.Cards.RemoveRange(0, cardsToMove);
        }

        // Reverse the order to keep the entered positions order
        movedCards.Reverse();

        foreach (var toPosition in toPositions)
        {
            if (movedCards.Count == 0)
            {
                Console.WriteLine($"Warning: No cards to move to {toPosition}.");
                continue;
            }

            var toGridItem = _grid[toPosition];
            int requestedCount = action.CardCount * fromPositions.Count;
            int cardsToMove = requestedCount == 0
                ? movedCards.Count
                : Math.Min(movedCards.Count, requestedCount);

            if (cardsToMove < requestedCount)
            {
                Console.WriteLine(
                    $"Warning: Only {cardsToMove} cards available to move to position {toPosition} less than the requested {requestedCount}.");
            }

            var cardsToInsert = movedCards.Take(cardsToMove).ToList();
            movedCards.RemoveRange(0, cardsToMove);

            foreach (var card in cardsToInsert)
            {
                // Update card visibility based on the action
                switch (action.CardVisibility)
                {
                    case VisibilityOptionEnum.Keep:
                        if (card.Visibility == CardVisibilityEnum.Cell)
                            card.Visibility = (CardVisibilityEnum)toGridItem.Visibility;
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

    public void ShuffleDeck(List<int> positions)
    {
        foreach (var position in positions)
        {
            var gridItem = _grid[position];
            var shuffledCards = gridItem.Cards.OrderBy(x => Guid.NewGuid()).ToList();
            gridItem.Cards.Clear();
            gridItem.Cards.AddRange(shuffledCards);
        }
    }

    public void AddScore(int valueToAdd, PlayerOptionEnum player)
    {
        List<User> users = new();
        switch (player)
        {
            case PlayerOptionEnum.Player1:
                users = _users.Where(user => user.Role == RoleEnum.Player1).ToList();
                break;
            case PlayerOptionEnum.Player2:
                users = _users.Where(user => user.Role == RoleEnum.Player2).ToList();
                break;
            case PlayerOptionEnum.Both:
                users = _users.Where(user => user.Role == RoleEnum.Player1 || user.Role == RoleEnum.Player2).ToList();
                break;
        }

        foreach (var user in users)
        {
            user.Score += valueToAdd;
        }
    }

    public void SetScore(int value, PlayerOptionEnum player)
    {
        List<User> users = new();
        switch (player)
        {
            case PlayerOptionEnum.Player1:
                users = _users.Where(user => user.Role == RoleEnum.Player1).ToList();
                break;
            case PlayerOptionEnum.Player2:
                users = _users.Where(user => user.Role == RoleEnum.Player2).ToList();
                break;
            case PlayerOptionEnum.Both:
                users = _users.Where(user => user.Role == RoleEnum.Player1 || user.Role == RoleEnum.Player2).ToList();
                break;
        }

        foreach (var user in users)
        {
            user.Score = value;
        }
    }
}