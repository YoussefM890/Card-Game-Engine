using Card_Game_Engine.Models.Filter.Enums;
using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Classes.Triggers;
using Card_Game_Engine.Models.Global.Enums.ParameterOptions.TriggerOptions;
using Card_Game_Engine.Utils;

namespace Card_Game_Engine.Functions;

public static class TriggerFunctions
{
    public static bool IsCardMoved(List<GridItem> before, List<GridItem> after, int? from, int? to, int? cardCount)
    {
        bool fromCondition = true, toCondition = true;

        if (from != null)
        {
            var fromCountBefore = before[from.Value].Cards.Count;
            var fromCountAfter = after[from.Value].Cards.Count;
            fromCondition = fromCountBefore - fromCountAfter == cardCount;
        }

        if (to != null)
        {
            var toCountBefore = before[to.Value].Cards.Count;
            var toCountAfter = after[to.Value].Cards.Count;
            toCondition = toCountAfter - toCountBefore == cardCount;
        }

        return fromCondition && toCondition;
    }

    public static bool IsDeckCardCountMatching(DeckCardCountTrigger triggerParams, List<GridItem> after)
    {
        // Apply the filter to each GridItem's Cards collection
        var gridAfterFilter = after;
        if (!string.IsNullOrEmpty(triggerParams.Filter))
        {
            gridAfterFilter = after.Select(gridItem => new GridItem(gridItem.Id)
            {
                Cards = FilterUtils.ApplyFilter(gridItem.Cards, triggerParams.Filter, FilterEnum.Card).ToList()
            }).ToList();
        }

        switch (triggerParams.PositionsRelation)
        {
            case PositionsRelationOptionEnum.Sum:
                int sum = triggerParams.Positions.Sum(pos =>
                    gridAfterFilter.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0);
                return CheckConditions(sum, triggerParams);

            case PositionsRelationOptionEnum.All:
                return triggerParams.Positions.All(pos =>
                    CheckConditions(gridAfterFilter.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0,
                        triggerParams));

            case PositionsRelationOptionEnum.Any:
                return triggerParams.Positions.Any(pos =>
                    CheckConditions(gridAfterFilter.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0,
                        triggerParams));

            default:
                throw new ArgumentException("Invalid PositionsRelation parameter.");
        }
    }

    private static bool CheckConditions(int cardCount, DeckCardCountTrigger triggerParams)
    {
        if (triggerParams.EqualTo.HasValue && cardCount != triggerParams.EqualTo.Value)
            return false;
        if (triggerParams.LessThan.HasValue && cardCount >= triggerParams.LessThan.Value)
            return false;
        if (triggerParams.GreaterThan.HasValue && cardCount <= triggerParams.GreaterThan.Value)
            return false;
        if (triggerParams.NotEqualTo.HasValue && cardCount == triggerParams.NotEqualTo.Value)
            return false;
        return true;
    }

    public static bool IsScoreSingleMatching(
        ScoreSingleTrigger triggerParams,
        List<Player> beforeActionPlayers,
        List<Player> afterActionPlayers)
    {
        var before = GetScore(beforeActionPlayers, triggerParams.PlayerId);
        var after = GetScore(afterActionPlayers, triggerParams.PlayerId);

        if (triggerParams.TriggerBehaviour == TriggerBehaviourOptionEnum.OnChange)
        {
            if (before == after) return false;
        }

        return CheckConditions(after, triggerParams);
    }

    public static bool IsScoreGroupMatching(
        ScoreGroupTrigger triggerParams,
        List<Player> beforeActionPlayers,
        List<Player> afterActionPlayers)
    {
        // OnChange gate: if none of the involved players changed, bail.
        if (triggerParams.TriggerBehaviour == TriggerBehaviourOptionEnum.OnChange)
        {
            var anyChanged = triggerParams.PlayerIds.Any(id =>
                GetScore(beforeActionPlayers, id) != GetScore(afterActionPlayers, id));
            if (!anyChanged) return false;
        }

        switch (triggerParams.Aggregate)
        {
            case AggregateOptionEnum.Any:
                // Any individual score satisfies the comparison
                return triggerParams.PlayerIds.Any(id =>
                    CheckConditions(GetScore(afterActionPlayers, id), triggerParams));

            case AggregateOptionEnum.All:
                // All individual scores satisfy the comparison
                return triggerParams.PlayerIds.All(id =>
                    CheckConditions(GetScore(afterActionPlayers, id), triggerParams));

            case AggregateOptionEnum.Max:
            {
                var value = triggerParams.PlayerIds
                    .Select(id => GetScore(afterActionPlayers, id))
                    .DefaultIfEmpty(0)
                    .Max();
                return CheckConditions(value, triggerParams);
            }

            case AggregateOptionEnum.Min:
            {
                var value = triggerParams.PlayerIds
                    .Select(id => GetScore(afterActionPlayers, id))
                    .DefaultIfEmpty(0)
                    .Min();
                return CheckConditions(value, triggerParams);
            }

            case AggregateOptionEnum.Sum:
            {
                var value = triggerParams.PlayerIds
                    .Select(id => GetScore(afterActionPlayers, id))
                    .Sum();
                return CheckConditions(value, triggerParams);
            }

            case AggregateOptionEnum.Avg:
            {
                var scores = triggerParams.PlayerIds
                    .Select(id => GetScore(afterActionPlayers, id))
                    .ToList();
                var avg = scores.Count == 0 ? 0 : (int)Math.Round(scores.Average());
                return CheckConditions(avg, triggerParams);
            }

            default:
                throw new ArgumentOutOfRangeException(nameof(triggerParams.Aggregate),
                    $"Unknown aggregate: {triggerParams.Aggregate}");
        }
    }

    public static bool IsScorePairMatching(
        ScorePairTrigger triggerParams,
        List<Player> beforeActionPlayers,
        List<Player> afterActionPlayers)
    {
        var beforeA = GetScore(beforeActionPlayers, triggerParams.PlayerAId);
        var beforeB = GetScore(beforeActionPlayers, triggerParams.PlayerBId);
        var afterA = GetScore(afterActionPlayers, triggerParams.PlayerAId);
        var afterB = GetScore(afterActionPlayers, triggerParams.PlayerBId);

        if (triggerParams.TriggerBehaviour == TriggerBehaviourOptionEnum.OnChange)
        {
            var changed = (beforeA != afterA) || (beforeB != afterB);
            if (!changed) return false;
        }

        var diff = afterA - afterB;
        return CheckConditions(diff, triggerParams);
    }


    private static int GetScore(List<Player> players, int playerId)
        => players.FirstOrDefault(p => p.Id == playerId)?.Score ?? 0;

    private static bool CheckConditions<T>(int value, T triggerParams) where T : IComparableTrigger
    {
        if (triggerParams.EqualTo.HasValue && value != triggerParams.EqualTo.Value)
            return false;
        if (triggerParams.NotEqualTo.HasValue && value == triggerParams.NotEqualTo.Value)
            return false;
        if (triggerParams.LessThan.HasValue && value >= triggerParams.LessThan.Value)
            return false;
        if (triggerParams.GreaterThan.HasValue && value <= triggerParams.GreaterThan.Value)
            return false;
        return true;
    }

    public static bool IsFormulaMatching(string condition, List<GridItem> afterActionCardContainer,
        List<Player> afterActionPlayers)
    {
        RootType root = new(afterActionCardContainer, afterActionPlayers);
        return (bool)EvaluateChain(condition, root);
    }


    public static object EvaluateChain(string chain, RootType root)
    {
        if (!(chain.Trim().StartsWith("{") && chain.Trim().EndsWith("}")))
        {
            return chain;
        }

        // Remove the outer braces.
        chain = chain.Substring(2, chain.Length - 3).Trim();

        // Tokenize the chain using our custom delimiters: '(' as group open, ')' as group close, and ';' as separator.
        List<string> tokens = FormulaUtils.Tokenize(chain, '(', ')', ';');

        // Convert the token list into a structured chain (list of ChainStep).
        List<ChainStep> chainSteps = FormulaUtils.ConvertChainListToObject(tokens);

        object? current = root;
        foreach (var step in chainSteps)
        {
            // Recursively evaluate each parameter.
            List<object> evaluatedParams = new List<object>();
            foreach (var param in step.Parameters)
            {
                evaluatedParams.Add(EvaluateChain(param, root));
            }

            // Invoke the action for the current chain step.
            current = FormulaUtils.InvokeMethod(current, step.MethodName, evaluatedParams.ToArray());
            if (current == null)
            {
                return false;
            }
        }

        return current;
    }

    public interface IComparableTrigger
    {
        int? EqualTo { get; }
        int? NotEqualTo { get; }
        int? LessThan { get; }
        int? GreaterThan { get; }
    }
}