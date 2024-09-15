using Card_Game_Engine.Models.CreateGame.Classes;
using Card_Game_Engine.Models.Global.Enums;
using Card_Game_Engine.Services;

namespace Card_Game_Engine.Models.Global.Classes;

public class Room
{
    public Room(string roomId)
    {
        Grid = new List<GridItem>();
        Rules = new List<Rule>();
        Id = roomId;
        Users = new List<User>();
        ManualTriggers = new List<ManualTrigger>();
        CardContainerService = new CardContainerService(this);
        RuleService = new RuleService(this);
        UserService = new UserService(this);
    }

    public string Id { get; private set; }
    public List<GridItem> Grid { get; private set; }
    public List<User> Users { get; private set; }
    public List<ManualTrigger> ManualTriggers { get; set; }
    public List<Rule> Rules { get; private set; }
    public RuleService RuleService { get; private set; }
    public CardContainerService CardContainerService { get; private set; }
    public UserService UserService { get; private set; }

    public List<GridTransferItem> GetTransferGrid(string userId)
    {
        var userIndex = Users.FindIndex(u => u.Id == userId); // Finding the index of the user in the list

        return Grid.Select(item =>
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
                }

                topCardTransfer = new CardTransfer(
                    topCard.Id,
                    topCard.FaceValue,
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

    public List<ManualTrigger> GetManualTriggersByUser(string userId)
    {
        var userIndex = Users.FindIndex(u => u.Id == userId);
        return ManualTriggers.Where(trigger =>
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

    public void UpdateRules(List<Rule> newRules)
    {
        Rules.Clear();
        Rules.AddRange(newRules);
    }

    public void UpdateGrid(List<GridItem> newGrid)
    {
        Grid.Clear();
        Grid.AddRange(newGrid);
    }

    public override string ToString()
    {
        var gridItems = string.Join(", ", Grid.Select(g => g.ToString()));
        var users = string.Join(", ", Users.Select(u => u.ToString()));
        var manualTriggers = string.Join(", ", ManualTriggers.Select(mt => mt.ToString()));
        var rules = string.Join(", ", Rules.Select(r => r.ToString()));

        return
            $"RoomId: {Id}, Grid: [{gridItems}], Users: [{users}], ManualTriggers: [{manualTriggers}], Rules: [{rules}], RuleService: {RuleService}, CardContainerService: {CardContainerService}";
    }
}