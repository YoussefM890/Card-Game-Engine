namespace Card_Game_Engine.Models.Global.Enums;

public enum CardVisibilityEnum
{
    Cell = 1, //have the same visibility as the grid item
    Visible = 2, //must have the same value of GridItemVisibility.Visible
    Hidden = 3, //must have the same value of GridItemVisibility.Hidden
    Specific = 4,
}