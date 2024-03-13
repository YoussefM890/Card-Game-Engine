namespace Card_Game_Engine.Models;

public class Rule
{
    public int Trigger { get; set; }
    public List<Action> Actions { get; set; }
}