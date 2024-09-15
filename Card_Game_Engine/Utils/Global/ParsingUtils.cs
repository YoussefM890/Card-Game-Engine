namespace Card_Game_Engine.Utils.Global;

public static class ParsingUtils
{
    public static int? ParseNullableInt(string? value)
    {
        return int.TryParse(value, out int result) ? result : null;
    }

    public static List<int>? CsvToIntList(string? csv, string? reference = null)
    {
        if (string.IsNullOrEmpty(csv))
        {
            return null;
        }

        var positions = csv.Split(',')
            .Select(pos =>
            {
                if (int.TryParse(pos, out var position))
                {
                    return position;
                }
                else
                {
                    throw new ArgumentException($"Invalid integer value: '{pos}'. Reference: {reference}");
                }
            })
            .ToList();

        if (!positions.Any())
        {
            throw new ArgumentException($"No valid integer values found. Reference: {reference}");
        }

        return positions;
    }
}