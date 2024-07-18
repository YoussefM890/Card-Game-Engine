using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Custom_Models.Create_Game;
using Card_Game_Engine.Models.Enums;
using GridItem = Card_Game_Engine.Models.Classes.GridItem;

namespace Card_Game_Engine.Services;

public class DatabaseService
{
    private readonly List<GridItem> _grid;
    private readonly List<Player> _players;
    private readonly List<Spectator> _spectators;
    private readonly List<User> _users;
    private List<ManualTrigger> _manualTriggers;
    public CardContainerService CardContainerService;

    public UserService UserService;

    public DatabaseService()
    {
        _grid = new List<GridItem>();
        _users = new List<User>();
        _players = new List<Player>();
        _spectators = new List<Spectator>();
        _manualTriggers = new List<ManualTrigger>();

        UserService = new UserService(_users, _players, _spectators);
        CardContainerService = new CardContainerService(_grid);
    }

    public List<GridTransferItem> GetTransferGrid(string userId)
    {
        var userIndex = _users.FindIndex(u => u.Id == userId); // Finding the index of the user in the list

        return _grid.Select(item =>
        {
            var topCard = item.Cards.FirstOrDefault();
            CardTransfer? topCardTransfer = null;

            if (topCard != null)
            {
                bool isFaceUp = true;

                // Determine card visibility based on the new visibility enums
                switch (topCard.Visibility)
                {
                    case CardVisibilityEnum.Visible:
                        isFaceUp = true;
                        break;
                    case CardVisibilityEnum.Hidden:
                        isFaceUp = false;
                        break;
                    case CardVisibilityEnum.Player1:
                        isFaceUp = userIndex != 1;
                        break;
                    case CardVisibilityEnum.Player2:
                        isFaceUp = userIndex != 0;
                        break;
                    case CardVisibilityEnum.Cell:
                        // Use the grid item's visibility as default
                        Console.WriteLine("Case Where we needed this option here");
                        switch (item.Visibility)
                        {
                            case GridItemVisibility.Visible:
                                isFaceUp = true;
                                break;
                            case GridItemVisibility.Hidden:
                                isFaceUp = false;
                                break;
                            case GridItemVisibility.Player1:
                                isFaceUp = userIndex != 1;
                                break;
                            case GridItemVisibility.Player2:
                                isFaceUp = userIndex != 0;
                                break;
                        }

                        break;
                }

                topCardTransfer = new CardTransfer(
                    topCard.Id,
                    topCard.Value,
                    topCard.Suit,
                    topCard.Name,
                    isFaceUp
                );
            }

            return new GridTransferItem
            {
                Id = item.Id,
                TopCard = topCardTransfer,
            };
        }).ToList();
    }


    public List<User> GetUsers()
    {
        return _users;
    }

    public List<Player> GetPlayers()
    {
        return _players;
    }

    public List<Spectator> GetSpectators()
    {
        return _spectators;
    }

    public List<GridItem> GetGrid()
    {
        return _grid;
    }

    public void SetManualTriggers(List<ManualTrigger> manualTriggers)
    {
        _manualTriggers = manualTriggers;
    }

    public List<ManualTrigger> GetManualTriggers(string userId)
    {
        var userIndex = _users.FindIndex(u => u.Id == userId);
        return _manualTriggers.Where(trigger =>
        {
            switch (trigger.Visibility)
            {
                case GridItemVisibility.Visible:
                    return true;
                case GridItemVisibility.Player1:
                    return userIndex == 0;
                case GridItemVisibility.Player2:
                    return userIndex == 1;
                default:
                    return false;
            }
        }).ToList();
    }
}