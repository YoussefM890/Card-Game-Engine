using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Services;

public class Utils
{
    public static int? ParseNullableInt(string? value)
    {
        return int.TryParse(value, out int result) ? result : null;
    }

    public static string? GetParameterValue(List<Parameter> parameters, ActionParameterEnum parameter,
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
}