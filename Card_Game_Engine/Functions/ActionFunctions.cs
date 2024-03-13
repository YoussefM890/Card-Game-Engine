using Card_Game_Engine.Models;

namespace Card_Game_Engine.Functions;

public class ActionFunctions
{
    private readonly CardContainer _cardContainer;
    public ActionFunctions(CardContainer cardContainer)
    {
        _cardContainer = cardContainer;
        Console.WriteLine(_cardContainer.ToString());
    }
    
}