namespace Card_Game_Engine.Exceptions;

public class RoomDoesNotExistException : Exception
{
    public RoomDoesNotExistException() : base("Room does not exist")
    {
    }


    public RoomDoesNotExistException(string message) : base(message)
    {
    }


    public RoomDoesNotExistException(string message, Exception innerException) : base(message, innerException)
    {
    }
}