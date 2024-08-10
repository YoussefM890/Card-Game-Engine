//action
export enum VisibilityOptionEnum {
  Keep = "0",
  Cell = "1",
  Visible = "2",
  Hidden = "3",
  Player1 = "4",
  Player2 = "5",
}

export enum PlayerOptionEnum {
  Player1 = "0",
  Player2 = "1",
  Both = "2",
}

//trigger
export enum PositionsRelationOptionEnum {
  Sum = '0',
  All = '1',
  Any = '2',
}

export enum ScoreTypeOptionEnum {
  Player1 = '0',
  Player2 = '1',
  Highest = '2',
  Lowest = '3',
  Any = '4',
  All = '5',
  Difference = '6'
}

export enum TriggerBehaviorOptionEnum {
  OnChange = '0',
  Continuous = '1'
}
