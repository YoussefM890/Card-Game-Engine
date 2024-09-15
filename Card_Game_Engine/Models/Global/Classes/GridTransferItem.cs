namespace Card_Game_Engine.Models.Global.Classes;

public class GridTransferItem
{
    public int Id { get; set; }
    public CardTransfer? TopCard { get; set; } // Holds the top card at this grid position
}