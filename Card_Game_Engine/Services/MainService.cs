using Card_Game_Engine.Models;

namespace Card_Game_Engine.Services;

public class MainService
{
    private CardContainer _cardContainer;
    public MainService()
    {
        _cardContainer = new CardContainer();
    }
}