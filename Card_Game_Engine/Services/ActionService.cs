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
    private readonly Room _room;

    public ActionService(Room room)
    {
        _room = room;
        _actionFunctions = new ActionFunctions(room);
    }

    private List<GridItem> _grid => _room.Grid;


    public void ExecuteMoveCardAction(Action action, string? userId = null)
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
        _actionFunctions.MoveCards(actionParams, userId);
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
        var playersString = RetrievalUtils.GetStringParameterValue(action.Parameters, ActionParameterEnum.Players);

        ExceptionHandlingUtils.ThrowExceptionIfAnyNull("Invalid AddScore action value parameters.", valueToAdd);
        ExceptionHandlingUtils.ThrowExceptionIfAllNullOrEmpty("Invalid AddScore Players parameters.", playersString);
        var players = ParsingUtils.CsvToIntList(playersString, "AddScore Players");
        _actionFunctions.AddScore(valueToAdd!.Value, players!);
    }

    public void ExecuteSetScoreAction(Action action)
    {
        var value = RetrievalUtils.GetIntParameterValue(action.Parameters, ActionParameterEnum.Value, 0);
        var playersString = RetrievalUtils.GetStringParameterValue(action.Parameters, ActionParameterEnum.Players);
        ExceptionHandlingUtils.ThrowExceptionIfAnyNull("Invalid AddScore action value parameters.", value);
        ExceptionHandlingUtils.ThrowExceptionIfAllNullOrEmpty("Invalid AddScore Players parameters.", playersString);
        var players = ParsingUtils.CsvToIntList(playersString, "SetScore Players");
        _actionFunctions.SetScore(value!.Value, players!);
    }
}