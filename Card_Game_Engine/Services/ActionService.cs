using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Classes.Actions;
using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Models.Enums.ParameterOptions.ActionOptions;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

public class ActionService
{
    private readonly ActionFunctions _actionFunctions;
    private readonly List<GridItem> _grid;

    public ActionService(List<GridItem> grid, List<User> users)
    {
        _grid = grid;
        _actionFunctions = new ActionFunctions(grid, users);
    }


    public void ExecuteMoveCardAction(Action action)
    {
        var fromPosition = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.FromPosition);
        var fromPositionsString = Utils.GetStringParameterValue(action.Parameters, ActionParameterEnum.FromPositions);
        var toPosition = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.ToPosition);
        var toPositionsString = Utils.GetStringParameterValue(action.Parameters, ActionParameterEnum.ToPositions);
        var cardCount = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.CardCount, 1);
        var visibility = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Visibility,
            (int)VisibilityOptionEnum.Cell);


        Utils.ThrowExceptionIfAllFalse("Specify either FromPosition or FromPositions for MoveCard action.",
            fromPosition.HasValue, !string.IsNullOrEmpty(fromPositionsString));

        Utils.ThrowExceptionIfAllFalse("Specify either ToPosition or ToPositions for MoveCard action.",
            toPosition.HasValue, !string.IsNullOrEmpty(toPositionsString));

        var fromPositions = Utils.CsvToIntList(fromPositionsString, "FromPositions");
        var toPositions = Utils.CsvToIntList(toPositionsString, "ToPositions");

        if (fromPosition.HasValue)
        {
            Utils.ThrowExceptionIfAnyIsInvalidGridId("Invalid FromPosition for MoveCard action.", _grid,
                fromPosition.Value);
        }
        else
        {
            Utils.ThrowExceptionIfAnyIsInvalidGridId("Invalid FromPositions for MoveCard action.", _grid,
                fromPositions!.ToArray());
        }

        if (toPosition.HasValue)
        {
            Utils.ThrowExceptionIfAnyIsInvalidGridId("Invalid ToPosition for MoveCard action.", _grid,
                toPosition.Value);
        }
        else
        {
            Utils.ThrowExceptionIfAnyIsInvalidGridId("Invalid ToPositions for MoveCard action.", _grid,
                toPositions!.ToArray());
        }

        MoveCardAction actionParams = new(fromPosition, fromPositions, toPosition, toPositions, cardCount!.Value,
            (VisibilityOptionEnum)visibility!);
        _actionFunctions.MoveCards(actionParams);
    }


    public void ExecuteShuffleDeckAction(Action action)
    {
        var positionsString = Utils.GetStringParameterValue(action.Parameters, ActionParameterEnum.AtPositions);
        Utils.ThrowExceptionIfAnyNullOrEmpty("Invalid ShuffleDeck action parameters.", positionsString);
        var positions = Utils.CsvToIntList(positionsString, "Shuffle Deck At Positions");
        Utils.ThrowExceptionIfAnyIsInvalidGridId("Invalid ShuffleDeck action parameters.", _grid, positions!.ToArray());
        _actionFunctions.ShuffleDeck(positions!);
    }

    public void ExecuteAddScoreAction(Action action)
    {
        var valueToAdd = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Value, 1);
        var player = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Player);
        Utils.ThrowExceptionIfAnyNull("Invalid AddScore action parameters.", valueToAdd, player);
        _actionFunctions.AddScore(valueToAdd!.Value, (PlayerOptionEnum)player!.Value);
    }

    public void ExecuteSetScoreAction(Action action)
    {
        var value = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Value, 0);
        var player = Utils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Player);
        Utils.ThrowExceptionIfAnyNull("Invalid SetScore action parameters.", value, player);
        _actionFunctions.SetScore(value!.Value, (PlayerOptionEnum)player!.Value);
    }
}