namespace Card_Game_Engine.Models.Classes.Triggers;

public class DeckCardCountTrigger
{
    public DeckCardCountTrigger(int deckPosition, int? equalTo, int? lessThan, int? greaterThan, int? notEqualTo)
    {
        Position = deckPosition;
        EqualTo = equalTo;
        LessThan = lessThan;
        GreaterThan = greaterThan;
        NotEqualTo = notEqualTo;
    }

    public int Position { get; set; }
    public int? EqualTo { get; set; }
    public int? LessThan { get; set; }
    public int? GreaterThan { get; set; }
    public int? NotEqualTo { get; set; }
}