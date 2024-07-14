namespace Card_Game_Engine.Models.Classes;

public class Trigger
{
    public int Id { get; set; }
    public List<Parameter> Parameters { get; set; } = new List<Parameter>();
}