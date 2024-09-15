using Card_Game_Engine.Models.CreateGame.Classes;

namespace Card_Game_Engine.Models.Global.Classes;

public class GameObject
{
    public GameObject(List<GridTransferItem> grid, int player1Score, int player2Score, int? width = null,
        int? height = null,
        List<ManualTrigger>? manualTriggers = null)
    {
        Grid = grid;
        Player1Score = player1Score;
        Player2Score = player2Score;
        Width = width;
        Height = height;
        ManualTriggers = manualTriggers ?? new List<ManualTrigger>();
    }

    public List<GridTransferItem> Grid { get; set; }
    public int Player1Score { get; set; }
    public int Player2Score { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
    public List<ManualTrigger> ManualTriggers { get; set; }
}