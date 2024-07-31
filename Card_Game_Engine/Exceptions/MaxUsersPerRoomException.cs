namespace Card_Game_Engine.Exceptions;

public class MaxUsersPerRoomException : Exception
{
    public MaxUsersPerRoomException() : base("Max users per room reached")
    {
    }


    public MaxUsersPerRoomException(string message) : base(message)
    {
    }


    public MaxUsersPerRoomException(string message, Exception innerException) : base(message, innerException)
    {
    }
}