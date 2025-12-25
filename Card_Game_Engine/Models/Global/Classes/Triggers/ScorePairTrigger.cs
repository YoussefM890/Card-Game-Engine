using Card_Game_Engine.Functions;
using Card_Game_Engine.Models.Global.Enums.ParameterOptions.TriggerOptions;

namespace Card_Game_Engine.Models.Global.Classes.Triggers;

public class ScorePairTrigger : TriggerFunctions.IComparableTrigger
{
    public ScorePairTrigger(
        int playerAId,
        int playerBId,
        TriggerBehaviourOptionEnum triggerBehaviour,
        int? equalTo = null,
        int? lessThan = null,
        int? greaterThan = null,
        int? notEqualTo = null)
    {
        PlayerAId = playerAId;
        PlayerBId = playerBId;
        TriggerBehaviour = triggerBehaviour;
        EqualTo = equalTo;
        NotEqualTo = notEqualTo;
        LessThan = lessThan;
        GreaterThan = greaterThan;
    }

    public int PlayerAId { get; }
    public int PlayerBId { get; }
    public TriggerBehaviourOptionEnum TriggerBehaviour { get; }
    public int? EqualTo { get; }
    public int? NotEqualTo { get; }
    public int? LessThan { get; }
    public int? GreaterThan { get; }
}