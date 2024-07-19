namespace Card_Game_Engine.Models.Enums;

public enum TriggerParameterEnum
{
    CardCount = 0,
    FromPosition = 1,
    ToPosition = 2,
    Positions = 3,
    By = 4,
    LessThan = 5,
    GreaterThan = 6,
    EqualTo = 7,
    NotEqualTo = 8,
    PositionsRelation = 9,
}

public enum ActionParameterEnum
{
    CardCount = 0,
    FromPositions = 1,
    ToPosition = 2,
    ShuffleCount = 3,
    Visibility = 4,
    AtPosition = 5,
}