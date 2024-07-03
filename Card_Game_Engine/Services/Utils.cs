namespace Card_Game_Engine.Services;

public class Utils
{
    public static int? ParseNullableInt(string? value)
    {
        return int.TryParse(value, out int result) ? (int?)result : null;
    }
}