using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Global.Enums.ParameterOptions.TriggerOptions;

namespace Card_Game_Engine.Models.Global.Classes.Triggers;

public class ScoreGroupTrigger : TriggerFunctions.IComparableTrigger
{
    public ScoreGroupTrigger(
        IEnumerable<int> playerIds,
        AggregateOptionEnum aggregate,
        TriggerBehaviourOptionEnum triggerBehaviour,
        int? equalTo = null,
        int? lessThan = null,
        int? greaterThan = null,
        int? notEqualTo = null)
    {
        if (playerIds == null) throw new ArgumentNullException(nameof(playerIds));
        var list = playerIds.ToList();
        if (list.Count == 0) throw new ArgumentException("Players collection cannot be empty.", nameof(playerIds));

        PlayerIds = list.AsReadOnly();
        Aggregate = aggregate;
        TriggerBehaviour = triggerBehaviour;
        EqualTo = equalTo;
        NotEqualTo = notEqualTo;
        LessThan = lessThan;
        GreaterThan = greaterThan;
    }

    public IReadOnlyList<int> PlayerIds { get; }
    public AggregateOptionEnum Aggregate { get; }
    public TriggerBehaviourOptionEnum TriggerBehaviour { get; }
    public int? EqualTo { get; }
    public int? NotEqualTo { get; }
    public int? LessThan { get; }
    public int? GreaterThan { get; }
}