using Card_Game_Engine.Models.Enums.ParameterOptions;

namespace Card_Game_Engine.Models.Classes.Actions;

public class MoveCardAction
{
    public MoveCardAction(int? fromPosition, List<int>? fromPositions, int? toPosition, List<int>? toPositions,
        int cardCount, VisibilityOptionEnum cardVisibility)
    {
        FromPosition = fromPosition;
        FromPositions = fromPositions;
        ToPosition = toPosition;
        ToPositions = toPositions;
        CardCount = cardCount;
        CardVisibility = cardVisibility;
    }

    public List<int>? FromPositions { get; set; }
    public int? FromPosition { get; set; }
    public int? ToPosition { get; set; }
    public List<int>? ToPositions { get; set; }
    public int CardCount { get; set; }
    public VisibilityOptionEnum CardVisibility { get; set; }
}