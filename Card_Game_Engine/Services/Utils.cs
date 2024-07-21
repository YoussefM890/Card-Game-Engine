using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Services;

public class Utils
{
    public static int? ParseNullableInt(string? value)
    {
        return int.TryParse(value, out int result) ? result : null;
    }

    public static string? GetStringParameterValue(List<Parameter> parameters, ActionParameterEnum parameter,
        string? defaultValue = null)
    {
        return parameters.FirstOrDefault(p => p.Id == (int)parameter)?.Value ?? defaultValue;
    }

    public static int? GetIntParameterValue(List<Parameter> parameters, ActionParameterEnum parameter,
        int? defaultValue = null)
    {
        var value = parameters.FirstOrDefault(p => p.Id == (int)parameter)?.Value;
        return int.TryParse(value, out int result) ? result : defaultValue;
    }

    public static int? GetIntParameterValue(List<Parameter> parameters, TriggerParameterEnum parameter,
        int? defaultValue = null)
    {
        var value = parameters.FirstOrDefault(p => p.Id == (int)parameter)?.Value;
        return int.TryParse(value, out int result) ? result : defaultValue;
    }

    public static string? GetStringParameterValue(List<Parameter> parameters, TriggerParameterEnum parameter,
        string? defaultValue = null)
    {
        return parameters.FirstOrDefault(p => p.Id == (int)parameter)?.Value ?? defaultValue;
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

    public static void ThrowExceptionIfAnyNull(string message, params int?[] values)
    {
        if (values.Any(v => v == null))
        {
            Console.WriteLine(message);
            throw new ArgumentException(message);
        }
    }


    public static void ThrowExceptionIfAnyNullOrEmpty(string message, params string?[] values)
    {
        if (values.Any(v => string.IsNullOrEmpty(v)))
        {
            Console.WriteLine(message);
            throw new ArgumentException(message);
        }
    }

    public static void ThrowExceptionIfAllNullOrEmpty(string message, params string?[] values)
    {
        if (values.All(v => string.IsNullOrEmpty(v)))
        {
            Console.WriteLine(message);
            throw new ArgumentException(message);
        }
    }

    public static void ThrowExceptionIfAllNull(string message, params int?[] values)
    {
        if (values.All(v => v == null))
        {
            Console.WriteLine(message);
            throw new ArgumentException(message);
        }
    }

    public static void ThrowExceptionIfAllFalse(string message, params bool[] values)
    {
        if (values.All(v => !v))
        {
            Console.WriteLine(message);
            throw new ArgumentException(message);
        }
    }

    public static void ThrowExceptionIfAnyIsInvalidGridId(string message, List<GridItem> grid, params int[] values)
    {
        if (values.Any(v => grid.Count <= v))
        {
            Console.WriteLine(message);
            throw new ArgumentException(message);
        }
    }
}