namespace Card_Game_Engine.Models.Classes;

public class Rule
{
    public List<Trigger> Triggers { get; set; }
    public List<Action> Actions { get; set; }
    public List<Rule> Rules { get; set; }
}