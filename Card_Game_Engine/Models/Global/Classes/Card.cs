using Card_Game_Engine.Models.Global.Enums;

namespace Card_Game_Engine.Models.Global.Classes;

public class Card
{
    // Constructor
    public Card(int? id = null, int? value = null, SuitEnum? suit = null, string? name = null,
        CardVisibilityEnum? visibility = null, bool? isPlayable = null)
    {
        FaceValue = value ?? 1;
        if (FaceValue < 1 || FaceValue > 14)
            throw new ArgumentOutOfRangeException(nameof(value), "Value must be between 1 and 13.");

        Id = id ?? 1;
        Suit = suit ?? SuitEnum.Hearts;
        Name = name ?? $"{FaceValue} of {Suit}";
        Visibility = visibility ?? CardVisibilityEnum.Cell;
        IsPlayable = isPlayable ?? true;
    }

    public int Id { get; set; }
    public int FaceValue { get; set; }
    public SuitEnum Suit { get; set; }
    public string Name { get; set; }
    public CardVisibilityEnum Visibility { get; set; }
    public bool IsPlayable { get; set; }
    public List<int> VisibleTo { get; set; } = new List<int>(); // List of player IDs who can see this card
}