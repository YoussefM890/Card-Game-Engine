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
        var rule = _rules.FirstOrDefault(r => r.Trigger == (int)trigger);
        if (rule != null)
        {
            ProcessActions(rule.Actions);
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
                GetTriggeredActions(cardContainerBeforeAction, _cardContainer);
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
            bool isTriggered;
            switch (rule.Trigger)
            {
                // case (int)TriggerEnum.GameStart:
                // isTriggered = isGameStartTriggered();
                case (int)TriggerEnum.CardMoved:
                    Console.WriteLine("checking card moved trigger");
                    isTriggered = _triggerService.ExecuteCardMovedTrigger(rule, beforeActionCardContainer,
                        afterActionCardContainer);
                    Console.WriteLine(isTriggered ? "Fired" : "Dit not Fire");
                    if (isTriggered) triggeredActions.AddRange(rule.Actions);
                    break;
            }
        }

        return triggeredActions;
    }
}