//action
export enum VisibilityOptionEnum {
  Keep = "0",
  Cell = "1",
  Visible = "2",
  Hidden = "3",
}

//trigger
export enum PositionsRelationOptionEnum {
  Sum = '0',
  All = '1',
  Any = '2',
}

export enum TriggerBehaviorOptionEnum {
  OnChange = '0',
  Continuous = '1'
}

export enum AggregationOptionEnum {
  Max = 1,
  Min = 2,
  Sum = 3,
  Avg = 4,
  Any = 5,
  All = 6
}
