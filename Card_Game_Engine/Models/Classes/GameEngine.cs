namespace Card_Game_Engine.Models;

public class GameEngine
{
    public CardContainer CardContainer { get; set; }

    public GameEngine()
    {
        CardContainer = new CardContainer();
    }

    // public void ExecuteTrigger(TriggerType trigger)
    // {
    //     switch (trigger)
    //     {
    //         case TriggerType.GameStart:
    //             // Define initial setup or actions to execute on game start
    //             break;
    //         // Handle other triggers
    //     }
    // }
}