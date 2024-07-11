using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Classes;

public class CardTransfer
{
    public CardTransfer(int id, int value, SuitEnum suit, string name, bool isFaceUp)
    {
        Id = id;
        Value = value;
        Suit = suit;
        Name = name;
        IsFaceUp = isFaceUp;
    }

    public int Id { get; set; } // from 1 to 52
    public int Value { get; set; } // from 1 to 13
    public SuitEnum Suit { get; set; } // e.g., "Hearts", "Spades"
    public string Name { get; set; }
    public bool IsFaceUp { get; set; }
}