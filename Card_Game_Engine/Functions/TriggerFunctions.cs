using Card_Game_Engine.Models;

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
}