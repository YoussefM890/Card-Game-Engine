using System.Text.Json.Serialization;
using Card_Game_Engine.Utils.Global;

namespace Card_Game_Engine.Models.Global.Classes;

public class Parameter
{
    public int Id { get; set; }

    [JsonConverter(typeof(FlexibleStringConverter))]
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

    public override string ToString()
    {
        return $"Parameter Id: {Id}, Value: {Value}";
    }
}