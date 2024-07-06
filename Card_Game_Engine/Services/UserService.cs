using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Services;

public class UserService
{
    private List<Player> _players;
    private List<Spectator> _spectators;
    private List<User> _users;

    public UserService(List<User> users, List<Player> players, List<Spectator> spectators)
    {
        _users = users;
        _players = players;
        _spectators = spectators;
    }

    public void AddUser(string userId)
    {
        _users.Add(new User(userId, RoleEnum.Player));

        // if (Players.Count < 2 )
        // {
        //     Players.Add(new Player(userId));
        // }
        // else
        // {
        //     Spectators.Add(new Spectator(userId));
        // }
    }

    public void RemoveUser(string userId)
    {
        User? user = _users.Find(user => user.Id == userId);
        if (user != null) _users.Remove(user);
    }
}