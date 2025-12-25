using Card_Game_Engine.Models.Global.Classes;
using Card_Game_Engine.Models.Global.Enums;
using Action = Card_Game_Engine.Models.Global.Classes.Action;

namespace Card_Game_Engine.Services;

public class RuleService
{
    private readonly ActionService _actionService;
    private readonly Room _room;

    private readonly TriggerService _triggerService;

    public RuleService(Room room)
    {
        _room = room;
        _actionService = new ActionService(room);
        _triggerService = new TriggerService();
    }

    public void FireTriggerIfFound(int trigger, string? userId = null)
    {
        var allActions = new List<Action>();
        var innerRules = new List<Rule>();
        foreach (var rule in _room.Rules)
        {
            var foundTriggers = rule.Triggers.Where(t => t.Id == (int)trigger).ToList();
            if (foundTriggers.Any())
            {
                allActions.AddRange(rule.Actions);
                innerRules.AddRange(rule.Rules);
            }
        }

        if (innerRules.Any())
        {
            allActions.AddRange(GetTriggeredActions(innerRules, _room.Grid, _room.Players));
        }

        if (allActions.Any())
        {
            ProcessActions(allActions, userId);
        }
        else
        {
            Console.WriteLine($"No Trigger Found Or Trigger Has No Actions to Process, Trigger: {trigger}");
        }
    }


    public void ProcessActions(List<Action> actions, string? userId = null)
    {
        Queue<Action> actionQueue = new Queue<Action>();

        //To insures the time efficiency when checking for action existence 
        HashSet<Action> actionSet = new HashSet<Action>();

        foreach (var action in actions)
        {
            if (!actionSet.Contains(action))
            {
                actionQueue.Enqueue(action);
                actionSet.Add(action);
            }
        }

        while (actionQueue.Count > 0)
        {
            var cardContainerBeforeAction = _room.CardContainerService.DeepCopy();
            List<Player> playersBeforeAction = _room.PlayerService.DeepCopy();

            var actionToExecute = actionQueue.Dequeue();
            actionSet.Remove(actionToExecute);

            ExecuteAction(actionToExecute, userId);
            var triggeredActions = GetTriggeredActions(
                _room.Rules,
                cardContainerBeforeAction,
                playersBeforeAction,
                _room.Grid,
                _room.Players
            );

            foreach (var triggeredAction in triggeredActions)
            {
                //only add the action if it is not already in the queue
                if (!actionSet.Contains(triggeredAction))
                {
                    actionQueue.Enqueue(triggeredAction);
                    actionSet.Add(triggeredAction);
                }
            }
        }
    }


    private void ExecuteAction(Action action, string? userId = null)
    {
        switch (action.Id)
        {
            case (int)ActionEnum.MoveCard:
                _actionService.ExecuteMoveCardAction(action, userId);
                break;
            case (int)ActionEnum.ShuffleDeck:
                _actionService.ExecuteShuffleDeckAction(action);
                break;
            case (int)ActionEnum.AddScore:
                _actionService.ExecuteAddScoreAction(action);
                break;
            case (int)ActionEnum.SetScore:
                _actionService.ExecuteSetScoreAction(action);
                break;
        }
    }

    private List<Action> GetTriggeredActions(List<Rule> rules, List<GridItem> beforeActionCardContainer,
        List<Player> beforeActionPlayers, List<GridItem>? afterActionCardContainer = null,
        List<Player>? afterActionPlayers = null)
    {
        afterActionCardContainer ??= beforeActionCardContainer;
        afterActionPlayers ??= beforeActionPlayers;
        var triggeredActions = new List<Action>();

        foreach (var rule in rules)
        {
            if (AreTriggersSatisfied(rule.Triggers, beforeActionCardContainer, afterActionCardContainer,
                    beforeActionPlayers, afterActionPlayers))
            {
                triggeredActions.AddRange(rule.Actions);
                triggeredActions.AddRange(GetTriggeredActions(rule.Rules, beforeActionCardContainer,
                    beforeActionPlayers, afterActionCardContainer, afterActionPlayers));
            }
        }

        return triggeredActions;
    }

    private bool AreTriggersSatisfied(List<Trigger> triggers, List<GridItem> beforeActionCardContainer,
        List<GridItem> afterActionCardContainer, List<Player> beforeActionPlayers, List<Player> afterActionPlayers)
    {
        foreach (var trigger in triggers)
        {
            bool isTriggered = false;
            switch (trigger.Id)
            {
                case (int)TriggerEnum.CardMoved:
                    isTriggered = _triggerService.ExecuteCardMovedTrigger(trigger, beforeActionCardContainer,
                        afterActionCardContainer);
                    break;
                case (int)TriggerEnum.DeckCardCount:
                    isTriggered = _triggerService.ExecuteDeckCardCountTrigger(trigger, afterActionCardContainer);
                    break;
                case (int)TriggerEnum.ScoreSingle:
                    isTriggered =
                        _triggerService.ExecuteScoreSingleTrigger(trigger, beforeActionPlayers, afterActionPlayers);
                    break;
                case (int)TriggerEnum.ScoreGroup:
                    isTriggered =
                        _triggerService.ExecuteScoreGroupTrigger(trigger, beforeActionPlayers, afterActionPlayers);
                    break;
                case (int)TriggerEnum.ScorePair:
                    isTriggered =
                        _triggerService.ExecuteScorePairTrigger(trigger, beforeActionPlayers, afterActionPlayers);
                    break;
                case (int)TriggerEnum.Formula:
                    isTriggered = _triggerService.ExecuteFormulaTrigger(trigger, beforeActionCardContainer,
                        afterActionCardContainer, beforeActionPlayers, afterActionPlayers);
                    break;
            }

            if (isTriggered)
            {
                return true;
            }
        }

        return false;
    }
}