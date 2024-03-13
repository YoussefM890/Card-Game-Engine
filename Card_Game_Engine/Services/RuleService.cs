using Card_Game_Engine.Models;
using Card_Game_Engine.Models.Enums;
using Action = Card_Game_Engine.Models.Action;

namespace Card_Game_Engine.Services;

public class RuleService
{
    private readonly ActionService _actionService;

    public RuleService()
    {
        _actionService = new ActionService();
    }

    public CardContainer ProcessRules(RuleSet ruleSet)
    {
        foreach (var rule in ruleSet.Rules)
        {
            foreach (var action in rule.Actions)
            {
                ExecuteAction(action);
            }
        }
        return _actionService.GetCardContainer();
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
}