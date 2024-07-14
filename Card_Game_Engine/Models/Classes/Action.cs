namespace Card_Game_Engine.Models;

public class Action
{
    public int Id { get; set; }
    public List<Parameter> Parameters { get; set; } = new List<Parameter>();

    public override bool Equals(object? obj)
    {
        if (obj is Action other)
        {
            return Id == other.Id && Parameters.SequenceEqual(other.Parameters);
        }

        return false;
    }

    public override int GetHashCode()
    {
        int hash = Id;
        foreach (var parameter in Parameters)
        {
            hash = HashCode.Combine(hash, parameter);
        }

        return hash;
    }
}