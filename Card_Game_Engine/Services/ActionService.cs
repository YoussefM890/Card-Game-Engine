using Card_Game_Engine.Functions;
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
        var fromPositionsString = Utils.GetStringParameterValue(action.Parameters, ActionParameterEnum.FromPositions);
        var toPosition = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.ToPosition);
        var cardCount = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.CardCount, 1);
        var visibility = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Visibility,
            (int)VisibilityOptionEnum.Keep);

        Utils.ThrowExceptionIfNullOrEmpty(toPosition, "Invalid MoveCard action parameters.");

        var fromPositions = Utils.CsvToIntList(fromPositionsString, "MoveCard action FromPositions");

        MoveCardAction actionParams = new(fromPositions, toPosition!.Value, cardCount!.Value,
            (VisibilityOptionEnum)visibility!);
        _actionFunctions.MoveCards(actionParams);
    }


    public void ExecuteShuffleDeckAction(Action action)
    {
        var position = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.AtPosition);

        Utils.ThrowExceptionIfNullOrEmpty(position, "Invalid ShuffleDeck action parameters.");

        _actionFunctions.ShuffleDeck(position!.Value);
    }
}