using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Classes.Actions;
using Card_Game_Engine.Models.Global.Enums;
using Card_Game_Engine.Models.Global.Enums.ParameterOptions.ActionOptions;

namespace Card_Game_Engine.Functions;

public class ActionFunctions
{
    private readonly Room _room;

    public ActionFunctions(Room room)
    {
        _room = room;
    }

    private List<GridItem> _grid => _room.Grid;
    private List<User> _users => _room.Users;
    private List<Player> _players => _room.Players;


    public void MoveCards(MoveCardAction action, string? userId = null)
    {
        // Handle moving cards
        List<int> fromPositions = action.FromPositions ?? new List<int> { action.FromPosition!.Value };
        List<int> toPositions = action.ToPositions ?? new List<int> { action.ToPosition!.Value };
        List<Card> movedCards = new();

        // Get the player ID of the user who invoked this action (for Private visibility)
        int? currentPlayerId = userId != null ? _room.GetPlayerIdForUser(userId) : null;

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
                        card.VisibleTo = toGridItem.VisibleTo;
                        break;
                    case VisibilityOptionEnum.Visible:
                        card.Visibility = CardVisibilityEnum.Visible;
                        card.VisibleTo.Clear();
                        break;
                    case VisibilityOptionEnum.Hidden:
                        card.Visibility = CardVisibilityEnum.Hidden;
                        card.VisibleTo.Clear();
                        break;
                    case VisibilityOptionEnum.Private:
                        card.Visibility = CardVisibilityEnum.Specific;
                        card.VisibleTo.Clear();
                        if (currentPlayerId.HasValue)
                            card.VisibleTo.Add(currentPlayerId.Value);
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

    public void AddScore(int valueToAdd, List<int> playerIds)
    {
        List<User> users = new();
        foreach (var playerId in playerIds)
        {
            Player player = _players.First(p => p.Id == playerId);
            player.Score += valueToAdd;
        }
    }

    public void SetScore(int value, List<int> playerIds)
    {
        List<User> users = new();
        foreach (var playerId in playerIds)
        {
            Player player = _players.First(p => p.Id == playerId);
            player.Score = value;
        }
    }
}