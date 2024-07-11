using Card_Game_Engine.Functions;
using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Actions;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Models.Enums.ParameterOptions;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

public class ActionService
{
    private readonly ActionFunctions _actionFunctions;

    public ActionService(List<GridItem> grid, List<User> users)
    {
        _actionFunctions = new ActionFunctions(grid, users);
    }


    public void ExecuteMoveCardAction(Action action)
    {
        var fromPosition = Utils.GetIntParameterValue(action.Parameters, ParameterEnum.FromPosition);
        var toPosition = Utils.GetIntParameterValue(action.Parameters, ParameterEnum.ToPosition);
        var cardCount = Utils.GetIntParameterValue(action.Parameters, ParameterEnum.CardCount, 1);
        var visibility =
            Utils.GetIntParameterValue(action.Parameters, ParameterEnum.Visibility, (int)VisibilityOptionEnum.Keep);

        if (fromPosition == null || toPosition == null)
        {
            Console.WriteLine("Invalid MoveCard action parameters.");
            throw new ArgumentException("Invalid MoveCard action parameters.");
        }

        MoveCardAction actionParams = new(fromPosition.Value, toPosition.Value, cardCount!.Value,
            (VisibilityOptionEnum)visibility!);
        _actionFunctions.MoveCards(actionParams);
    }
}