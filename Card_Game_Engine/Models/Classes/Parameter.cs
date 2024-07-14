namespace Card_Game_Engine.Models;

public class Parameter
{
    public int Id { get; set; }
    public string Value { get; set; }

    public override bool Equals(object? obj)
    {
        if (obj is Parameter other)
        {
            return Id == other.Id && Value == other.Value;
        }

        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, Value);
    }
}