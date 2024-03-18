using Card_Game_Engine.Functions;
using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Services;

public class TriggerService
{
    public bool ExecuteCardMovedTrigger(Rule rule, CardContainer before, CardContainer after)
    {
        var fromPosition = rule.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.FromPosition)?.Value;
        var toPosition = rule.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.ToPosition)?.Value;
        var cardCount = rule.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.CardCount)?.Value ?? "1";

        if ((fromPosition != null || toPosition != null) && int.TryParse(cardCount, out int count))
        {
            return TriggerFunctions.IsCardMoved(before, after, fromPosition, toPosition, count);
        }
        else
        {
            return false;
        }
    }
}