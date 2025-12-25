namespace Card_Game_Engine.Models.Global.Enums;

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
    ScoreMode = 10,
    TriggerBehavior = 11,
    Filter = 12,
    Condition = 13,
    PlayerA = 14,
    PlayerB = 15,
    Aggregate = 16,
    Player = 17,
    Players = 18,
}

public enum ActionParameterEnum
{
    CardCount = 0,
    FromPosition = 1,
    ToPosition = 2,
    ShuffleCount = 3,
    Visibility = 4,
    AtPositions = 5,
    AllCards = 6,
    FromPositions = 7,
    ToPositions = 8,
    Value = 9,
    Players = 10,
}