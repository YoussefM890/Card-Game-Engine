using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Triggers;

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
        var gridItem = after.FirstOrDefault(gridItem => gridItem.Id == triggerParams.Position);
        if (gridItem == null)
        {
            Console.WriteLine("Invalid Position parameter.");
            return false;
        }

        int cardCount = gridItem.Cards.Count;
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