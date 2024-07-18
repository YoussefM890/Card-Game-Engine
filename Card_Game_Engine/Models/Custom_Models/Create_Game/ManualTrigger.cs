using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Custom_Models.Create_Game;

public class ManualTrigger
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public GridItemVisibility Visibility { get; set; }
}