using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.Global.Classes;

/// <summary>
/// Represents a user in the room with their assigned player (if any)
/// </summary>
public class RoomParticipant
{
    public RoomParticipant(string userId, string userName, bool isRoomOwner, Player? assignedPlayer = null)
    {
        UserId = userId;
        UserName = userName;
        IsRoomOwner = isRoomOwner;
        AssignedPlayer = assignedPlayer;
        Role = assignedPlayer != null ? RoleEnum.Player : RoleEnum.Spectator;
    }

    public string UserId { get; set; }
    public string UserName { get; set; }
    public bool IsRoomOwner { get; set; }
    public RoleEnum Role { get; set; }
    public Player? AssignedPlayer { get; set; }
}