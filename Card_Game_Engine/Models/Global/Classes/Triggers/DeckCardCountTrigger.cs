using Card_Game_Engine.Models.Global.Enums.ParameterOptions.TriggerOptions;

namespace Card_Game_Engine.Models.Global.Classes.Triggers;

public class DeckCardCountTrigger
{
    public DeckCardCountTrigger(List<int> deckPosition, PositionsRelationOptionEnum positionsRelation, string? filter,
        int? equalTo, int? lessThan, int? greaterThan, int? notEqualTo)
    {
        Positions = deckPosition;
        PositionsRelation = positionsRelation;
        Filter = filter;
        EqualTo = equalTo;
        LessThan = lessThan;
        GreaterThan = greaterThan;
        NotEqualTo = notEqualTo;
    }

    public List<int> Positions { get; set; }
    public PositionsRelationOptionEnum PositionsRelation { get; set; }
    public string? Filter { get; set; }
    public int? EqualTo { get; set; }
    public int? LessThan { get; set; }
    public int? GreaterThan { get; set; }
    public int? NotEqualTo { get; set; }
}