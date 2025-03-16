using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Enums.ParameterOptions.TriggerOptions;
using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Classes.Triggers;
using Card_Game_Engine.Models.Global.Enums;
using Card_Game_Engine.Models.Global.Enums.ParameterOptions.TriggerOptions;
using Card_Game_Engine.Utils.Global;

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
            int? from = ParsingUtils.ParseNullableInt(fromPosition);
            int? to = ParsingUtils.ParseNullableInt(toPosition);
            return TriggerFunctions.IsCardMoved(before, after, from, to, count);
        }
        else
        {
            return false;
        }
    }

    public bool ExecuteDeckCardCountTrigger(Trigger trigger, List<GridItem> after)
    {
        var positionsString =
            RetrievalUtils.GetStringParameterValue(trigger.Parameters, TriggerParameterEnum.Positions);
        var filterString = RetrievalUtils.GetStringParameterValue(trigger.Parameters, TriggerParameterEnum.Filter);
        var equals = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEquals = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);
        var positionsRelation = RetrievalUtils.GetIntParameterValue(trigger.Parameters,
            TriggerParameterEnum.PositionsRelation,
            (int)PositionsRelationOptionEnum.Sum);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNullOrEmpty("Invalid DeckCardCount trigger parameters.",
            positionsString);


        if (equals == null && lessThan == null && greaterThan == null && notEquals == null)
        {
            Console.WriteLine("Invalid DeckCardCount trigger parameters.");
            return false;
        }

        var positions = ParsingUtils.CsvToIntList(positionsString);


        DeckCardCountTrigger triggerParams = new(positions!, (PositionsRelationOptionEnum)positionsRelation!.Value,
            filterString, equals, lessThan, greaterThan, notEquals);
        return TriggerFunctions.IsDeckCardCountMatching(triggerParams, after);
    }

    public bool ExecuteScoreTrigger(Trigger trigger, List<User> beforeActionUsers, List<User> afterActionUsers)
    {
        var scoreType = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.ScoreType);
        var equalTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEqualTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);
        var triggerBehaviour = RetrievalUtils.GetIntParameterValue(trigger.Parameters,
            TriggerParameterEnum.TriggerBehaviour,
            (int)TriggerBehaviourOptionEnum.OnChange);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNull("Invalid Score trigger parameters: ScoreType is missing.",
            scoreType);
        ExceptionHandlingUtils.ThrowExceptionIfAllNull(
            "Invalid Score trigger parameters: No comparison value provided.", equalTo,
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

    public bool ExecuteFormulaTrigger(Trigger trigger, List<GridItem> beforeActionCardContainer,
        List<GridItem> afterActionCardContainer, List<User> beforeActionUsers, List<User> afterActionUsers)
    {
        var condition = RetrievalUtils.GetStringParameterValue(trigger.Parameters, TriggerParameterEnum.Condition);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNullOrEmpty("Invalid Formula trigger parameters.", condition);

        return TriggerFunctions.IsFormulaMatching(condition!, afterActionCardContainer, afterActionUsers);
    }
}