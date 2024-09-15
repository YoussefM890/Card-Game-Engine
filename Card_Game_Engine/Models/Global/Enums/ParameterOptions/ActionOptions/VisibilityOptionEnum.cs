namespace Card_Game_Engine.Models.Global.Enums.ParameterOptions.ActionOptions;

public enum VisibilityOptionEnum
{
    Keep, //keep the same visibility of the card
    Cell, //have the same visibility as the grid item
    Visible = 2,
    Hidden = 3,
    Player1 = 4,
    Player2 = 5,
}