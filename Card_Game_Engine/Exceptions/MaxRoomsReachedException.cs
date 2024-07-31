namespace Card_Game_Engine.Exceptions;

public class MaxRoomsReachedException : Exception
{
    public MaxRoomsReachedException() : base("Max rooms reached")
    {
    }


    public MaxRoomsReachedException(string message) : base(message)
    {
    }

    public MaxRoomsReachedException(string message, Exception innerException) : base(message, innerException)
    {
    }
}