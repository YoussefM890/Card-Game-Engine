using Card_Game_Engine.Models;

namespace Card_Game_Engine.Functions;

public class TriggerFunctions
{
    public static bool IsCardMoved(CardContainer before, CardContainer after, int? from, int? to, int? cardCount)
    {
        bool fromCondition = true, toCondition = true;

        if (from != null)
        {
            var fromCountBefore = before.Grid[from.Value].Cards.Count;
            var fromCountAfter = after.Grid[from.Value].Cards.Count;
            fromCondition = fromCountBefore - fromCountAfter == cardCount;
        }

        if (to != null)
        {
            var toCountBefore = before.Grid[to.Value].Cards.Count;
            var toCountAfter = after.Grid[to.Value].Cards.Count;
            toCondition = toCountAfter - toCountBefore == cardCount;
        }

        return fromCondition && toCondition;
    }
}