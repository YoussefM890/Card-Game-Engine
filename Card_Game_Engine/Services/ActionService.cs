using Card_Game_Engine.Functions;
using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

// public interface IActionService
// {
//     void MoveCards(string fromId, string toId, int numberOfCards);
//     // Other actions...
// }
public class ActionService
{
    private readonly ActionFunctions _actionFunctions;
    public ActionService()
    {
        _actionFunctions = new ActionFunctions();
    }
    
    public CardContainer GetCardContainer()
    {
        return _actionFunctions.GetCardContainer();
    }
    public void ExecuteMoveCardAction(Action action)
    {
        var fromPosition = action.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.FromPosition)?.Value;
        var toPosition = action.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.ToPosition)?.Value;
        var cardCount = action.Parameters.FirstOrDefault(p => p.Id == (int)ParameterEnum.CardCount)?.Value ?? "2";

        if (fromPosition != null && toPosition != null && int.TryParse(cardCount, out int count))
        {
            _actionFunctions.MoveCards(fromPosition, toPosition, count);
        }
        else 
        {
            // throw new ArgumentException("Invalid MoveCard action parameters.");
            Console.WriteLine("Invalid MoveCard action parameters.");
        }
    }
}
