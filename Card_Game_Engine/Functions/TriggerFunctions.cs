using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Triggers;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Models.Enums.ParameterOptions.TriggerOptions;

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
            case PositionsRelationOptionEnum.Sum:
                int sum = triggerParams.Positions.Sum(pos =>
                    after.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0);
                return CheckConditions(sum, triggerParams);

            case PositionsRelationOptionEnum.All:
                return triggerParams.Positions.All(pos =>
                    CheckConditions(after.FirstOrDefault(gridItem => gridItem.Id == pos)?.Cards.Count ?? 0,
                        triggerParams));

            case PositionsRelationOptionEnum.Any:
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
            return false;
        if (triggerParams.LessThan.HasValue && cardCount >= triggerParams.LessThan.Value)
            return false;
        if (triggerParams.GreaterThan.HasValue && cardCount <= triggerParams.GreaterThan.Value)
            return false;
        if (triggerParams.NotEqualTo.HasValue && cardCount == triggerParams.NotEqualTo.Value)
            return false;
        return true;
    }

    public static bool IsScoreMatching(ScoreTrigger triggerParams, List<User> beforeActionUsers,
        List<User> afterActionUsers)
    {
        var beforePlayer1Score = beforeActionUsers.Find(user => user.Role == RoleEnum.Player1)?.Score ?? 0;
        var beforePlayer2Score = beforeActionUsers.Find(user => user.Role == RoleEnum.Player2)?.Score ?? 0;
        var afterPlayer1Score = afterActionUsers.Find(user => user.Role == RoleEnum.Player1)?.Score ?? 0;
        var afterPlayer2Score = afterActionUsers.Find(user => user.Role == RoleEnum.Player2)?.Score ?? 0;

        if (triggerParams.TriggerBehaviour == TriggerBehaviourOptionEnum.OnChange)
        {
            bool scoreChanged = false;
            switch (triggerParams.ScoreType)
            {
                case ScoreTypeOptionEnum.Player1:
                    scoreChanged = beforePlayer1Score != afterPlayer1Score;
                    break;
                case ScoreTypeOptionEnum.Player2:
                    scoreChanged = beforePlayer2Score != afterPlayer2Score;
                    break;
                case ScoreTypeOptionEnum.Highest:
                case ScoreTypeOptionEnum.Lowest:
                case ScoreTypeOptionEnum.Any:
                case ScoreTypeOptionEnum.All:
                case ScoreTypeOptionEnum.Difference:
                    scoreChanged = (beforePlayer1Score != afterPlayer1Score) ||
                                   (beforePlayer2Score != afterPlayer2Score);
                    break;
                default:
                    throw new ArgumentException("Invalid ScoreType");
            }

            if (!scoreChanged)
            {
                return false;
            }
        }

        switch (triggerParams.ScoreType)
        {
            case ScoreTypeOptionEnum.Player1:
                return CheckConditions(afterPlayer1Score, triggerParams);
            case ScoreTypeOptionEnum.Player2:
                return CheckConditions(afterPlayer2Score, triggerParams);
            case ScoreTypeOptionEnum.Highest:
                return CheckConditions(Math.Max(afterPlayer1Score, afterPlayer2Score), triggerParams);
            case ScoreTypeOptionEnum.Lowest:
                return CheckConditions(Math.Min(afterPlayer1Score, afterPlayer2Score), triggerParams);
            case ScoreTypeOptionEnum.Any:
                return CheckConditions(afterPlayer1Score, triggerParams) ||
                       CheckConditions(afterPlayer2Score, triggerParams);
            case ScoreTypeOptionEnum.All:
                return CheckConditions(afterPlayer1Score, triggerParams) &&
                       CheckConditions(afterPlayer2Score, triggerParams);
            case ScoreTypeOptionEnum.Difference:
                return CheckConditions(afterPlayer1Score - afterPlayer2Score, triggerParams);
            default:
                throw new ArgumentException("Invalid ScoreType");
        }
    }

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

    public interface IComparableTrigger
    {
        int? EqualTo { get; }
        int? NotEqualTo { get; }
        int? LessThan { get; }
        int? GreaterThan { get; }
    }
}