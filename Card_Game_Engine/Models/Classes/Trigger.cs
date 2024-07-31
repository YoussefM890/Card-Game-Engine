namespace Card_Game_Engine.Models.Classes;

public class Trigger
{
    public int Id { get; set; }
    public List<Parameter> Parameters { get; set; } = new List<Parameter>();

    public override string ToString()
    {
        var parameters = string.Join(", ", Parameters.Select(p => p.ToString()));
        return $"Trigger Id: {Id}, Parameters: [{parameters}]";
    }
}