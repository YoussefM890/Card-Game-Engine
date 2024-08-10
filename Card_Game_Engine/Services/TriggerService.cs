using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Triggers;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Models.Enums.ParameterOptions.TriggerOptions;

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
        var positionsString = Utils.GetStringParameterValue(trigger.Parameters, TriggerParameterEnum.Positions);
        var equals = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEquals = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);
        var positionsRelation = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.PositionsRelation,
            (int)PositionsRelationOptionEnum.Sum);

        Utils.ThrowExceptionIfAnyNullOrEmpty("Invalid DeckCardCount trigger parameters.", positionsString);


        if (equals == null && lessThan == null && greaterThan == null && notEquals == null)
        {
            Console.WriteLine("Invalid DeckCardCount trigger parameters.");
            return false;
        }

        var positions = Utils.CsvToIntList(positionsString);


        DeckCardCountTrigger triggerParams = new(positions, (PositionsRelationOptionEnum)positionsRelation!.Value,
            equals, lessThan, greaterThan, notEquals);
        return TriggerFunctions.IsDeckCardCountMatching(triggerParams, after);
    }

    public bool ExecuteScoreTrigger(Trigger trigger, List<User> beforeActionUsers, List<User> afterActionUsers)
    {
        var scoreType = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.ScoreType);
        var equalTo = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEqualTo = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);
        var triggerBehaviour = Utils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.TriggerBehaviour,
            (int)TriggerBehaviourOptionEnum.OnChange);

        Utils.ThrowExceptionIfAnyNull("Invalid Score trigger parameters: ScoreType is missing.", scoreType);
        Utils.ThrowExceptionIfAllNull("Invalid Score trigger parameters: No comparison value provided.", equalTo,
            lessThan, greaterThan, notEqualTo);

        ScoreTrigger triggerParams = new(
            (ScoreTypeOptionEnum)scoreType!.Value,
            (TriggerBehaviourOptionEnum)triggerBehaviour!.Value,
            equalTo,
            lessThan,
            greaterThan,
            notEqualTo
        );

        return TriggerFunctions.IsScoreMatching(triggerParams, beforeActionUsers, afterActionUsers);
    }
}