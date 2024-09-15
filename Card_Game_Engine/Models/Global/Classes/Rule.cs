namespace Card_Game_Engine.Models.Global.Classes;

public class Rule
{
    public List<Trigger> Triggers { get; set; }
    public List<Action> Actions { get; set; }
    public List<Rule> Rules { get; set; }

    public override string ToString()
    {
        var triggers = string.Join(", ", Triggers.Select(t => t.ToString()));
        var actions = string.Join(", ", Actions.Select(a => a.ToString()));
        var rules = string.Join(", ", Rules.Select(r => r.ToString()));

        return $"Triggers: [{triggers}], Actions: [{actions}], Rules: [{rules}]";
    }
}