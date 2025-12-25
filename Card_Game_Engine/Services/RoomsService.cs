using Card_Game_Engine.Exceptions;
using Card_Game_Engine.Models.Global.Classes;

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
        _rooms.Last().Value.Users.Add(new User(userId, true, "User 1"));
        Console.WriteLine("room Created");
        return roomId;
    }

    public void JoinRoom(string roomId, string userId)
    {
        if (_rooms.ContainsKey(roomId))
        {
            var usersCount = _rooms[roomId].Users.Count;
            if (usersCount >= 5)
            {
                throw new MaxUsersPerRoomException();
            }

            string userName = "User" + (usersCount + 1);
            _rooms[roomId].Users.Add(new User(userId, false, userName));
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