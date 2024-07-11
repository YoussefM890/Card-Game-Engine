using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Services;

public class Utils
{
    public static int? ParseNullableInt(string? value)
    {
        return int.TryParse(value, out int result) ? (int?)result : null;
    }

    public static string GetParameterValue(List<Parameter> parameters, ParameterEnum parameterEnum,
        string defaultValue = null)
    {
        return parameters.FirstOrDefault(p => p.Id == (int)parameterEnum)?.Value ?? defaultValue;
    }

    public static int? GetIntParameterValue(List<Parameter> parameters, ParameterEnum parameterEnum,
        int? defaultValue = null)
    {
        var value = parameters.FirstOrDefault(p => p.Id == (int)parameterEnum)?.Value;
        return int.TryParse(value, out int result) ? result : defaultValue;
    }
}