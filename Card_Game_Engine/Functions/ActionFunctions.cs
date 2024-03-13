using Card_Game_Engine.Models;

namespace Card_Game_Engine.Functions;

public class ActionFunctions
{
    private readonly CardContainer _cardContainer;
    public ActionFunctions()
    {
        _cardContainer = new CardContainer();
    }
    public CardContainer GetCardContainer()
    {
        return _cardContainer;
    }
    public void MoveCards(string fromId, string toId, int numberOfCards)
    {
        if (!_cardContainer.Grid.ContainsKey(fromId) || !_cardContainer.Grid.ContainsKey(toId))
        {
            throw new ArgumentException("Invalid grid ID.");
        }

        var fromGridItem = _cardContainer.Grid[fromId];
        var toGridItem = _cardContainer.Grid[toId];

        var cardsToMove = fromGridItem.Cards.Take(numberOfCards).ToList();
        fromGridItem.Cards.RemoveRange(0, numberOfCards);
        toGridItem.Cards.AddRange(cardsToMove);
    }
    
}