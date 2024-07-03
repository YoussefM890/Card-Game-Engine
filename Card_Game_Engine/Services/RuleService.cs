using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

public class RuleService
{
    private readonly ActionService _actionService;
    private readonly TriggerService _triggerService = new();
    private CardContainer _cardContainer;
    private List<Rule> _rules = new();

    public RuleService(CardContainer cardContainer)
    {
        _cardContainer = cardContainer;
        _actionService = new ActionService(cardContainer);
    }

    public void SetRules(List<Rule> rules)
    {
        _rules = rules;
    }

    public void FireTriggerIfFound(TriggerEnum trigger)
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
        foreach (var action in actions)
        {
            actionQueue.Enqueue(action);
        }

        while (actionQueue.Count > 0)
        {
            CardContainer cardContainerBeforeAction = _cardContainer.DeepCopy();
            var actionToExecute = actionQueue.Dequeue();
            ExecuteAction(actionToExecute);
            var triggeredActions =
                GetTriggeredActions(_rules, cardContainerBeforeAction, _cardContainer);
            foreach (var triggeredAction in triggeredActions)
            {
                actionQueue.Enqueue(triggeredAction);
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
            // Add other cases for different actions
        }
    }

    private List<Action> GetTriggeredActions(List<Rule> rules, CardContainer beforeActionCardContainer,
        CardContainer afterActionCardContainer)
    {
        var triggeredActions = new List<Action>();

        foreach (var rule in rules)
        {
            // Check if the parent rule triggers are satisfied
            if (AreTriggersSatisfied(rule.Triggers, beforeActionCardContainer, afterActionCardContainer))
            {
                // Add parent rule actions
                triggeredActions.AddRange(rule.Actions);
                triggeredActions.AddRange(GetTriggeredActions(rule.Rules, beforeActionCardContainer,
                    afterActionCardContainer));
            }
        }

        return triggeredActions;
    }

    private bool AreTriggersSatisfied(List<Trigger> triggers, CardContainer beforeActionCardContainer,
        CardContainer afterActionCardContainer)
    {
        foreach (var trigger in triggers)
        {
            bool isTriggered = false;
            switch (trigger.Id)
            {
                // case (int)TriggerEnum.GameStart:
                // isTriggered = isGameStartTriggered();
                case (int)TriggerEnum.CardMoved:
                    isTriggered = _triggerService.ExecuteCardMovedTrigger(trigger, beforeActionCardContainer,
                        afterActionCardContainer);
                    Console.WriteLine(isTriggered ? "Fired" : "Dit not Fire");
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