using Card_Game_Engine.Models.Enums;

namespace Card_Game_Engine.Models.Classes;

public class Card
{
    // Constructor
    public Card(int? id = null, int? value = null, SuitEnum? suit = null, string? name = null,
        CardVisibilityEnum? visibility = null, bool? isPlayable = null)
    {
        Value = value ?? 1;
        if (Value < 1 || Value > 14)
            throw new ArgumentOutOfRangeException(nameof(value), "Value must be between 1 and 13.");

        Id = id ?? 1;
        Suit = suit ?? SuitEnum.HEARTS;
        Name = name ?? $"{Value} of {Suit}";
        Visibility = visibility ?? CardVisibilityEnum.Cell;
        IsPlayable = isPlayable ?? true;
    }

    public int Id { get; set; }
    public int Value { get; set; }
    public SuitEnum Suit { get; set; }
    public string Name { get; set; }
    public CardVisibilityEnum Visibility { get; set; }
    public bool IsPlayable { get; set; }
}