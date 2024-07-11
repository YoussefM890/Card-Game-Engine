using Card_Game_Engine.Models.Enums.ParameterOptions;

namespace Card_Game_Engine.Models.Classes.Actions;

public class MoveCardAction
{
    public MoveCardAction(int fromPosition, int toPosition, int cardCount, VisibilityOptionEnum cardVisibility)
    {
        FromPosition = fromPosition;
        ToPosition = toPosition;
        CardCount = cardCount;
        CardVisibility = cardVisibility;
    }

    public int FromPosition { get; set; }
    public int ToPosition { get; set; }
    public int CardCount { get; set; }
    public VisibilityOptionEnum CardVisibility { get; set; }
}