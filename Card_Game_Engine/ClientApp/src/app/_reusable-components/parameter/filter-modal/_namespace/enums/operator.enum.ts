export enum OperatorEnum {
  EqualTo = 0,
  NotEqualTo = 1,
  GreaterThan = 2,
  LessThan = 3,
  GreaterThanOrEqualTo = 4,
  LessThanOrEqualTo = 5,
  In = 6,
  NotIn = 7,
}


export const OperatorEnumView: Readonly<Record<OperatorEnum, string>> = {
  [OperatorEnum.EqualTo]: '=',
  [OperatorEnum.NotEqualTo]: '<>',
  [OperatorEnum.GreaterThan]: '>',
  [OperatorEnum.LessThan]: '<',
  [OperatorEnum.GreaterThanOrEqualTo]: '>=',
  [OperatorEnum.LessThanOrEqualTo]: '<=',
  [OperatorEnum.In]: 'in',
  [OperatorEnum.NotIn]: 'not in',
};
