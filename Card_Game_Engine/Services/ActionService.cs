using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Classes.Actions;
using Card_Game_Engine.Models.Global.Enums;
using Card_Game_Engine.Models.Global.Enums.ParameterOptions.ActionOptions;
using Card_Game_Engine.Utils.Global;
using Action = Card_Game_Engine.Models.Global.Classes.Action;

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
        var fromPosition = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.FromPosition);
        var fromPositionsString =
            RetrievalUtils.GetStringParameterValue(action.Parameters, ActionParameterEnum.FromPositions);
        var toPosition = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.ToPosition);
        var toPositionsString =
            RetrievalUtils.GetStringParameterValue(action.Parameters, ActionParameterEnum.ToPositions);
        var cardCount = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.CardCount, 1);
        var visibility = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Visibility,
            (int)VisibilityOptionEnum.Cell);


        ExceptionHandlingUtils.ThrowExceptionIfAllFalse(
            "Specify either FromPosition or FromPositions for MoveCard action.",
            fromPosition.HasValue, !string.IsNullOrEmpty(fromPositionsString));

        ExceptionHandlingUtils.ThrowExceptionIfAllFalse("Specify either ToPosition or ToPositions for MoveCard action.",
            toPosition.HasValue, !string.IsNullOrEmpty(toPositionsString));

        var fromPositions = ParsingUtils.CsvToIntList(fromPositionsString, "FromPositions");
        var toPositions = ParsingUtils.CsvToIntList(toPositionsString, "ToPositions");

        if (fromPosition.HasValue)
        {
            ExceptionHandlingUtils.ThrowExceptionIfAnyIsInvalidGridId("Invalid FromPosition for MoveCard action.",
                _grid,
                fromPosition.Value);
        }
        else
        {
            ExceptionHandlingUtils.ThrowExceptionIfAnyIsInvalidGridId("Invalid FromPositions for MoveCard action.",
                _grid,
                fromPositions!.ToArray());
        }

        if (toPosition.HasValue)
        {
            ExceptionHandlingUtils.ThrowExceptionIfAnyIsInvalidGridId("Invalid ToPosition for MoveCard action.", _grid,
                toPosition.Value);
        }
        else
        {
            ExceptionHandlingUtils.ThrowExceptionIfAnyIsInvalidGridId("Invalid ToPositions for MoveCard action.", _grid,
                toPositions!.ToArray());
        }

        MoveCardAction actionParams = new(fromPosition, fromPositions, toPosition, toPositions, cardCount!.Value,
            (VisibilityOptionEnum)visibility!);
        _actionFunctions.MoveCards(actionParams);
    }


    public void ExecuteShuffleDeckAction(Action action)
    {
        var positionsString =
            RetrievalUtils.GetStringParameterValue(action.Parameters, ActionParameterEnum.AtPositions);
        ExceptionHandlingUtils.ThrowExceptionIfAnyNullOrEmpty("Invalid ShuffleDeck action parameters.",
            positionsString);
        var positions = ParsingUtils.CsvToIntList(positionsString, "Shuffle Deck At Positions");
        ExceptionHandlingUtils.ThrowExceptionIfAnyIsInvalidGridId("Invalid ShuffleDeck action parameters.", _grid,
            positions!.ToArray());
        _actionFunctions.ShuffleDeck(positions!);
    }

    public void ExecuteAddScoreAction(Action action)
    {
        var valueToAdd = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Value, 1);
        var player = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Player);
        ExceptionHandlingUtils.ThrowExceptionIfAnyNull("Invalid AddScore action parameters.", valueToAdd, player);
        _actionFunctions.AddScore(valueToAdd!.Value, (PlayerOptionEnum)player!.Value);
    }

    public void ExecuteSetScoreAction(Action action)
    {
        var value = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Value, 0);
        var player = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Player);
        ExceptionHandlingUtils.ThrowExceptionIfAnyNull("Invalid SetScore action parameters.", value, player);
        _actionFunctions.SetScore(value!.Value, (PlayerOptionEnum)player!.Value);
    }
}