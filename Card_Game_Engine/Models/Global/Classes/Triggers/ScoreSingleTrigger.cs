using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Global.Enums.ParameterOptions.TriggerOptions;

namespace Card_Game_Engine.Models.Global.Classes.Triggers;

public class ScoreSingleTrigger : TriggerFunctions.IComparableTrigger
{
    public ScoreSingleTrigger(
        int playerId,
        TriggerBehaviourOptionEnum triggerBehaviour,
        int? equalTo = null,
        int? lessThan = null,
        int? greaterThan = null,
        int? notEqualTo = null)
    {
        PlayerId = playerId;
        TriggerBehaviour = triggerBehaviour;
        EqualTo = equalTo;
        NotEqualTo = notEqualTo;
        LessThan = lessThan;
        GreaterThan = greaterThan;
    }

    public int PlayerId { get; }
    public TriggerBehaviourOptionEnum TriggerBehaviour { get; }
    public int? EqualTo { get; }
    public int? NotEqualTo { get; }
    public int? LessThan { get; }
    public int? GreaterThan { get; }
}