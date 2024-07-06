namespace Card_Game_Engine.Models.Classes;

public class GameObject
{
    public GameObject(List<GridItem> grid, int? width = null, int? height = null)
    {
        Grid = grid;
        Width = width;
        Height = height;
    }

    public List<GridItem> Grid { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
}