using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Triggers;
using Card_Game_Engine.Models.Enums.ParameterOptions;

namespace Card_Game_Engine.Functions;

public class TriggerFunctions
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
        switch (triggerParams.PositionsRelation)
        {
            case PositionsRelationOptionsEnum.Sum:
                int sum = triggerParams.Positions.Sum(pos =>
                    after.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0);
                return CheckConditions(sum, triggerParams);

            case PositionsRelationOptionsEnum.All:
                return triggerParams.Positions.All(pos =>
                    CheckConditions(after.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0,
                        triggerParams));

            case PositionsRelationOptionsEnum.Any:
                return triggerParams.Positions.Any(pos =>
                    CheckConditions(after.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0,
                        triggerParams));

            default:
                throw new ArgumentException("Invalid PositionsRelation parameter.");
        }
    }

    private static bool CheckConditions(int cardCount, DeckCardCountTrigger triggerParams)
    {
        if (triggerParams.EqualTo.HasValue && cardCount != triggerParams.EqualTo.Value)
        {
            return false;
        }

        if (triggerParams.LessThan.HasValue && cardCount >= triggerParams.LessThan.Value)
        {
            return false;
        }

        if (triggerParams.GreaterThan.HasValue && cardCount <= triggerParams.GreaterThan.Value)
        {
            return false;
        }

        if (triggerParams.NotEqualTo.HasValue && cardCount == triggerParams.NotEqualTo.Value)
        {
            return false;
        }

        return true;
    }
}