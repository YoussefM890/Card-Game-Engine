using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Classes;

namespace Card_Game_Engine.Services;

public class DatabaseService
{
    private readonly List<GridItem> _grid;
    private readonly List<Player> _players;
    private readonly List<Spectator> _spectators;
    private readonly List<User> _users;
    public CardContainerService CardContainerService;

    public UserService UserService;

    public DatabaseService()
    {
        _grid = new List<GridItem>();
        _users = new List<User>();
        _players = new List<Player>();
        _spectators = new List<Spectator>();

        UserService = new UserService(_users, _players, _spectators);
        CardContainerService = new CardContainerService(_grid);
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
}