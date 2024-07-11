namespace Card_Game_Engine.Models.Classes;

public class GameObject
{
    public GameObject(List<GridTransferItem> grid, int? width = null, int? height = null)
    {
        Grid = grid;
        Width = width;
        Height = height;
    }

    public List<GridTransferItem> Grid { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
}