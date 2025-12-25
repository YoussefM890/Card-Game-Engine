using Card_Game_Engine.Functions;
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


    public bool ExecuteScoreSingleTrigger(Trigger trigger, List<Player> beforePlayers, List<Player> afterPlayers)
    {
        var playerId = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.Player);
        var equalTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEqualTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);
        var behaviour = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.TriggerBehavior,
            (int)TriggerBehaviourOptionEnum.OnChange);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNull("Invalid Score(Single) trigger: Player is missing.", playerId);
        ExceptionHandlingUtils.ThrowExceptionIfAllNull(
            "Invalid Score(Single) trigger: No comparison provided.",
            equalTo, lessThan, greaterThan, notEqualTo);

        var p = new ScoreSingleTrigger(
            playerId!.Value,
            (TriggerBehaviourOptionEnum)behaviour!.Value,
            equalTo,
            lessThan,
            greaterThan,
            notEqualTo
        );

        return TriggerFunctions.IsScoreSingleMatching(p, beforePlayers, afterPlayers);
    }

    public bool ExecuteScoreGroupTrigger(Trigger trigger, List<Player> beforePlayers, List<Player> afterPlayers)
    {
        var playersCsv = RetrievalUtils.GetStringParameterValue(trigger.Parameters, TriggerParameterEnum.Players);
        var aggregate = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.Aggregate);
        var equalTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEqualTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);
        var behaviour = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.TriggerBehavior,
            (int)TriggerBehaviourOptionEnum.OnChange);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNullOrEmpty(
            "Invalid Score(Group) trigger: Players or Aggregate missing.", playersCsv);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNull(
            "Invalid Score(Group) trigger: Aggregate is missing.", aggregate);

        ExceptionHandlingUtils.ThrowExceptionIfAllNull(
            "Invalid Score(Group) trigger: No comparison provided.",
            equalTo, lessThan, greaterThan, notEqualTo);

        var playerIds = ParsingUtils.CsvToIntList(playersCsv!);

        var p = new ScoreGroupTrigger(
            playerIds!,
            (AggregateOptionEnum)aggregate!.Value,
            (TriggerBehaviourOptionEnum)behaviour!.Value,
            equalTo,
            lessThan,
            greaterThan,
            notEqualTo
        );

        return TriggerFunctions.IsScoreGroupMatching(p, beforePlayers, afterPlayers);
    }

    public bool ExecuteScorePairTrigger(Trigger trigger, List<Player> beforePlayers, List<Player> afterPlayers)
    {
        var playerAId = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.PlayerA);
        var playerBId = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.PlayerB);
        var equalTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.EqualTo);
        var lessThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.LessThan);
        var greaterThan = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.GreaterThan);
        var notEqualTo = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.NotEqualTo);
        var behaviour = RetrievalUtils.GetIntParameterValue(trigger.Parameters, TriggerParameterEnum.TriggerBehavior,
            (int)TriggerBehaviourOptionEnum.OnChange);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNull(
            "Invalid Score(Pair) trigger: Player A or B is missing.", playerAId, playerBId);

        ExceptionHandlingUtils.ThrowExceptionIfAllNull(
            "Invalid Score(Pair) trigger: No comparison provided.",
            equalTo, lessThan, greaterThan, notEqualTo);

        var p = new ScorePairTrigger(
            playerAId!.Value,
            playerBId!.Value,
            (TriggerBehaviourOptionEnum)behaviour!.Value,
            equalTo,
            lessThan,
            greaterThan,
            notEqualTo
        );

        return TriggerFunctions.IsScorePairMatching(p, beforePlayers, afterPlayers);
    }

    public bool ExecuteFormulaTrigger(Trigger trigger, List<GridItem> beforeActionCardContainer,
        List<GridItem> afterActionCardContainer, List<Player> beforeActionPlayers, List<Player> afterActionPlayers)
    {
        var condition = RetrievalUtils.GetStringParameterValue(trigger.Parameters, TriggerParameterEnum.Condition);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNullOrEmpty("Invalid Formula trigger parameters.", condition);

        return TriggerFunctions.IsFormulaMatching(condition!, afterActionCardContainer, afterActionPlayers);
    }
}