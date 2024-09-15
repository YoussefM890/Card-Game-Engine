using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Utils.Global;

public static class RetrievalUtils
{
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
}