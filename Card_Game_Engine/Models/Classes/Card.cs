using Card_Game_Engine.Models.Enums;
using Card_Game_Engine.Models.Enums.ParameterOptions;

namespace Card_Game_Engine.Models;

public class Card
{
    // Constructor
    public Card(int id = 1, int value = 1, SuitEnum suit = SuitEnum.HEARTS, string? name = null,
        CardVisibilityEnum visibility = CardVisibilityEnum.Cell, bool isPlayable = true)
    {
        // Basic validations to ensure the properties fall within expected ranges or states
        if (id < 1 || id > 52) throw new ArgumentOutOfRangeException(nameof(id), "Id must be between 1 and 52.");
        if (value < 1 || value > 14)
            throw new ArgumentOutOfRangeException(nameof(value), "Value must be between 1 and 13.");

        Id = id;
        Value = value;
        Suit = suit;
        Name = name ?? $"{value} of {suit}"; // You can customize this to handle special names for face cards, etc.
        Visibility = visibility;
        IsPlayable = isPlayable;
    }

    public int Id { get; set; } // from 1 to 52
    public int Value { get; set; } // from 1 to 13
    public SuitEnum Suit { get; set; } // e.g., "Hearts", "Spades"
    public string Name { get; set; }
    public CardVisibilityEnum Visibility { get; set; }
    public bool IsPlayable { get; set; }
}