using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.CreateGame.Classes;

public class ManualTrigger
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public GridItemVisibility Visibility { get; set; }
}