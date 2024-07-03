using Card_Game_Engine.Functions;
using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Services;

public class TriggerService
{
    public bool ExecuteCardMovedTrigger(Trigger trigger, CardContainer before, CardContainer after)
    {
        var fromPosition = trigger.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.FromPosition)?.Value;
        var toPosition = trigger.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.ToPosition)?.Value;
        var cardCount = trigger.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.CardCount)?.Value ?? "1";

        if ((fromPosition != null || toPosition != null) && int.TryParse(cardCount, out int count))
        {
            int? from = Utils.ParseNullableInt(fromPosition);
            int? to = Utils.ParseNullableInt(toPosition);
            return TriggerFunctions.IsCardMoved(before, after, from, to, count);
        }
        else
        {
            return false;
        }
    }
}