using Card_Game_Engine.Models.Global.Classes;

namespace Card_Game_Engine.Services;

public class PlayerService
{
    private List<Player> _players;

    public PlayerService(Room room)
    {
        _players = room.Players;
    }

    public List<Player> DeepCopy()
    {
        return _players.Select(player => player.DeepCopy()).ToList();
    }
}