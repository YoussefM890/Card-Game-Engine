using Card_Game_Engine.Exceptions;
using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Services;

public class RoomsService
{
    private Dictionary<string, Room> _rooms;

    public RoomsService()
    {
        _rooms = new Dictionary<string, Room>();
    }

    public string CreateRoom(string userId)
    {
        var maxRooms = 3;
        if (_rooms.Count >= maxRooms)
        {
            throw new MaxRoomsReachedException();
        }

        var roomId = Guid.NewGuid().ToString();
        _rooms.Add(roomId, new Room(roomId));
        _rooms.Last().Value.Users.Add(new User(userId, true, RoleEnum.Player1));
        Console.WriteLine("room Created");
        // Console.WriteLine(string.Join(", ", _rooms.Select(room => room.Value.Id)));
        return roomId;
    }

    public RoleEnum JoinRoom(string roomId, string userId)
    {
        if (_rooms.ContainsKey(roomId))
        {
            var usersCount = _rooms[roomId].Users.Count;
            if (usersCount >= 3)
            {
                throw new MaxUsersPerRoomException();
            }

            switch (usersCount)
            {
                case 1:
                    _rooms[roomId].Users.Add(new User(userId, false, RoleEnum.Player2));
                    break;
                default:
                    _rooms[roomId].Users.Add(new User(userId, false, RoleEnum.Spectator));
                    break;
            }

            Console.WriteLine("rooms " + _rooms.ToString());
            return _rooms[roomId].Users.Last().Role;
        }
        else
        {
            throw new RoomDoesNotExistException();
        }
    }

    public Room? GetRoomByUserId(string userId)
    {
        return _rooms.FirstOrDefault(room => room.Value.Users.Any(user => user.Id == userId)).Value;
    }

    public void RemoveRoomIfEmpty(string roomId)
    {
        if (_rooms[roomId].Users.Count == 0)
        {
            Console.WriteLine("Room removed: " + _rooms[roomId].Id);
            _rooms.Remove(roomId);
            Console.WriteLine(string.Join(", ", _rooms.Select(room => room.Value.Id)));
        }
    }

    public User? RemoveUserIfInRoom(string userId)
    {
        var room = GetRoomByUserId(userId);
        if (room == null) return null;

        var userToRemove = room.Users.FirstOrDefault(user => user.Id == userId);
        if (userToRemove == null) return null;

        bool wasRoomOwner = userToRemove.IsRoomOwner;
        room.Users.Remove(userToRemove);

        if (wasRoomOwner)
        {
            _rooms.Remove(room.Id);
        }
        else
        {
            RemoveRoomIfEmpty(room.Id);
        }

        return userToRemove;
    }


    private void SetRoomOwner(string roomId)
    {
        if (_rooms.TryGetValue(roomId, out var room) && room.Users.Any())
        {
            var oldestUser = room.Users.OrderBy(user => user.JoinedAt).First();
            oldestUser.IsRoomOwner = true;
        }
    }

    public List<User> GetAllUsersInTheSameRoom(string userId)
    {
        var room = GetRoomByUserId(userId);
        if (room == null)
        {
            return new List<User>();
        }

        return room.Users;
    }

    public List<User> GetOtherUsersInTheSameRoom(string userId)
    {
        var room = GetRoomByUserId(userId);
        if (room == null)
        {
            return new List<User>();
        }

        return room.Users.Where(user => user.Id != userId).ToList();
    }
}