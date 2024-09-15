using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Services;

public class UserService
{
    private List<User> _users;

    public UserService(Room room)
    {
        _users = room.Users;
    }

    public List<int> GetScores()
    {
        var player1Score = _users.Find(u => u.Role == RoleEnum.Player1)?.Score ?? 0;
        var player2Score = _users.Find(u => u.Role == RoleEnum.Player2)?.Score ?? 0;

        return new List<int> { player1Score, player2Score };
    }

    public List<User> DeepCopy()
    {
        return _users.Select(user => user.DeepCopy()).ToList();
    }
}