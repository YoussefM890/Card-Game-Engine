using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Classes;

public class Card
{
    // Constructor
    public Card(int id = 1, int value = 1, SuitEnum suit = SuitEnum.HEARTS, string? name = null,
        CardVisibilityEnum visibility = CardVisibilityEnum.Cell, bool isPlayable = true)
    {
        if (value < 1 || value > 14)
            throw new ArgumentOutOfRangeException(nameof(value), "Value must be between 1 and 13.");

        Id = id;
        Value = value;
        Suit = suit;
        Name = name ?? $"{value} of {suit}";
        Visibility = visibility;
        IsPlayable = isPlayable;
    }

    public int Id { get; set; }
    public int Value { get; set; }
    public SuitEnum Suit { get; set; }
    public string Name { get; set; }
    public CardVisibilityEnum Visibility { get; set; }
    public bool IsPlayable { get; set; }
}