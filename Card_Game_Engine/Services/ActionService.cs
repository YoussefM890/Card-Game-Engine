using Card_Game_Engine.Functions;
using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

public class ActionService
{
    private readonly ActionFunctions _actionFunctions;

    public ActionService(CardContainer cardContainer)
    {
        _actionFunctions = new ActionFunctions(cardContainer);
    }


    public void ExecuteMoveCardAction(Action action)
    {
        var fromPosition = action.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.FromPosition)?.Value;
        var toPosition = action.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.ToPosition)?.Value;
        var cardCount = action.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.CardCount)?.Value ?? "1";

        if (fromPosition != null && toPosition != null && int.TryParse(cardCount, out int count))
        {
            int.TryParse(fromPosition, out int from);
            int.TryParse(toPosition, out int to);
            _actionFunctions.MoveCards(from, to, count);
        }
        else
        {
            // throw new ArgumentException("Invalid MoveCard action parameters.");
            Console.WriteLine("Invalid MoveCard action parameters.");
        }
    }
}