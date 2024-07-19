using GlobalClasses = Card_Game_Engine.Models.Classes;
using GlobalEnums = Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Custom_Models.Create_Game;

public class Card
{
    public Card(int value, GlobalEnums.SuitEnum suit)
    {
        Value = value;
        Suit = suit;
    }

    public int Value { get; set; }
    public GlobalEnums.SuitEnum Suit { get; set; }

    public GlobalClasses.Card ToGlobalCard(int id, string? name = null,
        GlobalEnums.CardVisibilityEnum? visibility = null, bool? isPlayable = null)
    {
        return new GlobalClasses.Card(
            id,
            Value,
            Suit,
            name,
            visibility ?? GlobalEnums.CardVisibilityEnum.Cell,
            isPlayable ?? true
        );
    }
}