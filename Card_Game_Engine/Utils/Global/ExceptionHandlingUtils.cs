using Card_Game_Engine.Models.Global.Classes;

namespace Card_Game_Engine.Utils.Global;

public static class ExceptionHandlingUtils
{
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