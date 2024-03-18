using Card_Game_Engine.Models;

namespace Card_Game_Engine.Functions;

public class TriggerFunctions
{
    public static bool IsCardMoved(CardContainer before, CardContainer after, string? from, string? to, int? cardCount)
    {
        bool fromCondition = true, toCondition = true;

        if (from != null)
        {
            var fromCountBefore = before.Grid.ContainsKey(from) ? before.Grid[from].Cards.Count : 0;
            var fromCountAfter = after.Grid.ContainsKey(from) ? after.Grid[from].Cards.Count : 0;
            fromCondition = fromCountBefore - fromCountAfter == cardCount;
        }

        if (to != null)
        {
            var toCountBefore = before.Grid.ContainsKey(to) ? before.Grid[to].Cards.Count : 0;
            var toCountAfter = after.Grid.ContainsKey(to) ? after.Grid[to].Cards.Count : 0;
            toCondition = toCountAfter - toCountBefore == cardCount;
        }

        return fromCondition && toCondition;
    }
}