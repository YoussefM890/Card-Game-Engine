using Card_Game_Engine.Models.Classes;

namespace Card_Game_Engine.Services;

public class UserService
{
    private List<User> _users;

    public UserService(List<User> users)
    {
        _users = users;
    }
}