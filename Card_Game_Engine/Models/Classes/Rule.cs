namespace Card_Game_Engine.Models;

public class Rule
{
    // public Trigger Trigger { get; set; }
    public int Trigger { get; set; }
    public List<Action> Actions { get; set; }
    public List<Parameter> Parameters { get; set; }
}