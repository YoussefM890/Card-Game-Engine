namespace Card_Game_Engine.Models.Global.Classes;

/// <summary>
/// Complete state of the room including all participants and available players
/// </summary>
public class RoomState
{
    public RoomState(string roomId, List<RoomParticipant> participants, List<Player> availablePlayers)
    {
        RoomId = roomId;
        Participants = participants;
        AvailablePlayers = availablePlayers;
    }

    public string RoomId { get; set; }
    public List<RoomParticipant> Participants { get; set; }
    public List<Player> AvailablePlayers { get; set; } // Players not yet assigned
}