using Card_Game_Engine.Functions;
using Card_Game_Engine.Models;

namespace Card_Game_Engine.Services;

public interface IActionService
{
    void MoveCards(string fromId, string toId, int numberOfCards);
    // Other actions...
}
public class ActionService : IActionService
{
    private readonly CardContainer _cardContainer;

    public ActionService()
    {
        _cardContainer = new CardContainer();
    }
    public CardContainer GetCardContainer()
    {
        return _cardContainer;
    }

    public void MoveCards(string fromId, string toId, int numberOfCards)
    {
        // Your logic to move cards
    }
}
