namespace Card_Game_Engine.Models.Enums;

public enum TriggerParameterEnum
{
    CardCount = 0,
    FromPosition = 1,

    // FromVisibility = 1,
    ToPosition = 2,

    // ToVisibility = 2,
    Position = 3,
    By = 4,
    LessThan = 5,
    GreaterThan = 6,
    EqualTo = 7,
    NotEqualTo = 8,
}

public enum ActionParameterEnum
{
    CardCount = 0,
    FromPosition = 1,
    ToPosition = 2,
    ShuffleCount = 3,
    Visibility = 4,
}