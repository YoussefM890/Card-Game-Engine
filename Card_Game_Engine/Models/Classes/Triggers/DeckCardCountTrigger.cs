using Card_Game_Engine.Models.Enums.ParameterOptions.TriggerOptions;

namespace Card_Game_Engine.Models.Classes.Triggers;

public class DeckCardCountTrigger
{
    public DeckCardCountTrigger(List<int> deckPosition, PositionsRelationOptionEnum positionsRelation, int? equalTo,
        int? lessThan, int? greaterThan, int? notEqualTo)
    {
        Positions = deckPosition;
        PositionsRelation = positionsRelation;
        EqualTo = equalTo;
        LessThan = lessThan;
        GreaterThan = greaterThan;
        NotEqualTo = notEqualTo;
    }

    public List<int> Positions { get; set; }
    public PositionsRelationOptionEnum PositionsRelation { get; set; }
    public int? EqualTo { get; set; }
    public int? LessThan { get; set; }
    public int? GreaterThan { get; set; }
    public int? NotEqualTo { get; set; }
}