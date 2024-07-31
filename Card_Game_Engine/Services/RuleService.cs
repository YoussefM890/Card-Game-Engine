using Card_Game_Engine.Models.Classes;
using Card_Game_Engine.Models.Enums;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

public class RuleService
{
    private readonly ActionService _actionService;
    private readonly CardContainerService _cardContainerService;
    private readonly List<GridItem> _grid;

    private readonly TriggerService _triggerService;
    private List<Rule> _rules;

    public RuleService(Room room)
    {
        _cardContainerService = room.CardContainerService;
        _grid = room.Grid;
        _actionService = new ActionService(_grid, room.Users);
        _rules = room.Rules;
        _triggerService = new TriggerService();
    }

    public void FireTriggerIfFound(int trigger)
    {
        var allActions = new List<Action>();
        foreach (var rule in _rules)
        {
            var foundTriggers = rule.Triggers.Where(t => t.Id == (int)trigger).ToList();
            if (foundTriggers.Any())
            {
                allActions.AddRange(rule.Actions);
            }
        }

        if (allActions.Any())
        {
            ProcessActions(allActions);
        }
        else
        {
            Console.WriteLine($"Trigger {trigger} not found.");
        }
    }


    public void ProcessActions(List<Action> actions)
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
            List<GridItem> cardContainerBeforeAction = _cardContainerService.DeepCopy();
            var actionToExecute = actionQueue.Dequeue();
            actionSet.Remove(actionToExecute);

            ExecuteAction(actionToExecute);
            var triggeredActions = GetTriggeredActions(_rules, cardContainerBeforeAction, _grid);

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


    private void ExecuteAction(Action action)
    {
        switch (action.Id)
        {
            case (int)ActionEnum.MoveCard:
                _actionService.ExecuteMoveCardAction(action);
                break;
            case (int)ActionEnum.ShuffleDeck:
                _actionService.ExecuteShuffleDeckAction(action);
                break;
        }
    }

    private List<Action> GetTriggeredActions(List<Rule> rules, List<GridItem> beforeActionCardContainer,
        List<GridItem> afterActionCardContainer)
    {
        var triggeredActions = new List<Action>();

        foreach (var rule in rules)
        {
            if (AreTriggersSatisfied(rule.Triggers, beforeActionCardContainer, afterActionCardContainer))
            {
                triggeredActions.AddRange(rule.Actions);
                triggeredActions.AddRange(GetTriggeredActions(rule.Rules, beforeActionCardContainer,
                    afterActionCardContainer));
            }
        }

        return triggeredActions;
    }

    private bool AreTriggersSatisfied(List<Trigger> triggers, List<GridItem> beforeActionCardContainer,
        List<GridItem> afterActionCardContainer)
    {
        foreach (var trigger in triggers)
        {
            bool isTriggered = false;
            switch (trigger.Id)
            {
                case (int)TriggerEnum.CardMoved:
                    isTriggered = _triggerService.ExecuteCardMovedTrigger(trigger, beforeActionCardContainer,
                        afterActionCardContainer);
                    Console.WriteLine(isTriggered ? "CardMoved Fired" : "CardMoved Dit not Fire");
                    break;
                case (int)TriggerEnum.DeckCardCount:
                    isTriggered = _triggerService.ExecuteDeckCardCountTrigger(trigger, afterActionCardContainer);
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