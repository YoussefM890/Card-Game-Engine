using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

public class RuleService
{
    private readonly ActionService _actionService;
    private readonly List<Rule> _rules;
    private readonly TriggerService _triggerService;

    public RuleService(List<Rule> rules)
    {
        _actionService = new ActionService();
        _triggerService = new TriggerService();
        _rules = rules;
    }

    public CardContainer FireTriggerIfFound(TriggerEnum trigger)
    {
        var rule = _rules.FirstOrDefault(r => r.Trigger == (int)trigger);
        if (rule != null)
        {
            ProcessRule(rule);
        }
        else
        {
            Console.WriteLine($"Trigger {trigger} not found.");
        }

        return _actionService.GetCardContainer();
    }

    private void ProcessRule(Rule rule)
    {
        Queue<Action> actionQueue = new Queue<Action>();
        foreach (var action in rule.Actions)
        {
            actionQueue.Enqueue(action);
        }

        while (actionQueue.Count > 0)
        {
            CardContainer cardContainerBeforeAction = _actionService.GetCardContainer().DeepCopy();
            var actionToExecute = actionQueue.Dequeue();
            ExecuteAction(actionToExecute);
            var triggeredActions =
                GetTriggeredActions(cardContainerBeforeAction, _actionService.GetCardContainer());
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

    private List<Action> GetTriggeredActions(CardContainer beforeActionCardContainer,
        CardContainer afterActionCardContainer)
    {
        var triggeredActions = new List<Action>();
        foreach (var rule in _rules)
        {
            Console.WriteLine("checking trigger : " + rule.Trigger);
            bool isTriggered = false;
            switch (rule.Trigger)
            {
                // case (int)TriggerEnum.GameStart:
                // isTriggered = isGameStartTriggered();
                case (int)TriggerEnum.CardMoved:
                    Console.WriteLine("checking card moved trigger");
                    isTriggered =
                        _triggerService.ExecuteCardMovedTrigger(rule, beforeActionCardContainer,
                            afterActionCardContainer);
                    Console.WriteLine(isTriggered ? "Fired" : "Dit not Fire");
                    if (isTriggered) triggeredActions.AddRange(rule.Actions);
                    break;
            }
        }

        return triggeredActions;
    }
}