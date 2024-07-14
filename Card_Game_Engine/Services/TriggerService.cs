using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Triggers;
using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Services;

public class TriggerService
{
    public bool ExecuteCardMovedTrigger(Trigger trigger, List<GridItem> before, List<GridItem> after)
    {
        var fromPosition = trigger.Parameters.FirstOrDefault(p => p.Id == (int)TriggerParameterEnum.FromPosition)
            ?.Value;
        var toPosition = trigger.Parameters.FirstOrDefault(p => p.Id == (int)TriggerParameterEnum.ToPosition)?.Value;
        var cardCount = trigger.Parameters.FirstOrDefault(p => p.Id == (int)TriggerParameterEnum.CardCount)?.Value ??
                        "1";

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

    public bool ExecuteDeckCardCountTrigger(Trigger trigger, List<GridItem> after)
    {
        var position = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.Position);
        var equals = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEquals = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);

        if (position == null || (equals == null && lessThan == null && greaterThan == null && notEquals == null))
        {
            Console.WriteLine("Invalid DeckCardCount trigger parameters.");
            return false;
        }

        DeckCardCountTrigger triggerParams = new(position!.Value, equals, lessThan, greaterThan, notEquals);
        return TriggerFunctions.IsDeckCardCountMatching(triggerParams, after);
    }
}