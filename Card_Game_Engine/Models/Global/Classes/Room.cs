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
        Players = new List<Player>();
        ManualTriggers = new List<ManualTrigger>();
        CardContainerService = new CardContainerService(this);
        RuleService = new RuleService(this);
        PlayerService = new PlayerService(this);
    }

    public string Id { get; private set; }
    public List<GridItem> Grid { get; private set; }
    public List<User> Users { get; private set; }
    public List<Player> Players { get; set; }
    public List<ManualTrigger> ManualTriggers { get; set; }
    public List<Rule> Rules { get; private set; }
    public List<RoomUserPlayer> UserPlayerAssociations { get; set; } = new List<RoomUserPlayer>();
    public RuleService RuleService { get; private set; }
    public CardContainerService CardContainerService { get; private set; }
    public PlayerService PlayerService { get; private set; }

    public List<GridTransferItem> GetTransferGrid(string userId)
    {
        var playerId = GetPlayerIdForUser(userId);

        return Grid.Select(item =>
        {
            var topCard = item.Cards.FirstOrDefault();
            CardTransfer? topCardTransfer = null;

            if (topCard != null)
            {
                bool isFaceUp = DetermineCardVisibility(topCard, item, playerId);

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

    private bool DetermineCardVisibility(Card card, GridItem gridItem, int? playerId)
    {
        switch (card.Visibility)
        {
            case CardVisibilityEnum.Visible:
                return true;

            case CardVisibilityEnum.Hidden:
                return false;

            case CardVisibilityEnum.Cell:
                // Dynamically resolve based on grid item visibility
                return gridItem.Visibility == GridItemVisibility.Visible;

            case CardVisibilityEnum.Specific:
                // Check if the current player can see this card
                if (playerId == null)
                    return false;

                // First check card-specific visibility
                return card.VisibleTo.Contains(playerId.Value);

                // If no specific visibility is set, default to hidden
                return false;

            default:
                return true;
        }
    }

    public List<ManualTrigger> GetManualTriggersByUser(string userId)
    {
        // If the user has no assigned player, they see nothing (e.g., spectators)
        var playerId = GetPlayerIdForUser(userId);
        if (playerId == null)
            return new List<ManualTrigger>();

        return GetManualTriggersByPlayer(playerId.Value);
    }

    public List<ManualTrigger> GetManualTriggersByPlayer(int playerId)
    {
        // VisibleTo is a List<string> of player IDs
        return ManualTriggers
            .Where(t => t.VisibleTo.Contains(playerId))
            .ToList();
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

    // Get the PlayerId for a given UserId
    public int? GetPlayerIdForUser(string userId)
    {
        return UserPlayerAssociations
            .FirstOrDefault(a => a.UserId == userId)
            ?.PlayerId;
    }

    // Get the UserId for a given PlayerId
    public string? GetUserIdForPlayer(int playerId)
    {
        return UserPlayerAssociations
            .FirstOrDefault(a => a.PlayerId == playerId)
            ?.UserId;
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

    public Player? GetPlayer(int id)
    {
        return Players.FirstOrDefault(p => p.Id == id);
    }

    public User? GetUser(string id)
    {
        return Users.FirstOrDefault(u => u.Id == id);
    }

    // Assign a player to a user
    public void AssignPlayerToUser(string userId, int playerId)
    {
        // Remove any existing assignment for this user
        UnassignPlayerFromUser(userId);

        // Remove any existing assignment for this player
        var existingAssignment = UserPlayerAssociations.FirstOrDefault(a => a.PlayerId == playerId);
        if (existingAssignment != null)
        {
            UserPlayerAssociations.Remove(existingAssignment);
        }

        // Create new assignment
        UserPlayerAssociations.Add(new RoomUserPlayer
        {
            RoomId = Id,
            UserId = userId,
            PlayerId = playerId
        });

        // Update user role
        var user = GetUser(userId);
        if (user != null)
        {
            user.Role = RoleEnum.Player;
        }
    }

    // Unassign player from a user
    public void UnassignPlayerFromUser(string userId)
    {
        var assignment = UserPlayerAssociations.FirstOrDefault(a => a.UserId == userId);
        if (assignment != null)
        {
            UserPlayerAssociations.Remove(assignment);
        }

        // Update user role to spectator
        var user = GetUser(userId);
        if (user != null)
        {
            user.Role = RoleEnum.Spectator;
        }
    }

    // Get room state with all participants
    public RoomState GetRoomState()
    {
        var participants = Users.Select(user =>
        {
            var playerId = GetPlayerIdForUser(user.Id);
            Player? assignedPlayer = playerId.HasValue ? GetPlayer(playerId.Value) : null;
            return new RoomParticipant(user.Id, user.Name, user.IsRoomOwner, assignedPlayer);
        }).ToList();

        var assignedPlayerIds = UserPlayerAssociations.Select(a => a.PlayerId).ToHashSet();
        var availablePlayers = Players.Where(p => !assignedPlayerIds.Contains(p.Id)).ToList();

        return new RoomState(Id, participants, availablePlayers);
    }
}