import {ReferenceEnum} from "../enums/reference.enum";
import {OperatorEnum} from "../enums/operator.enum";
import {IFilterNode} from "../interfaces/filter-node";
import {LogicalOperatorEnum} from "../enums/logical-operator.enum";

export class FilterCondition implements IFilterNode {
  id: ReferenceEnum;
  operator: OperatorEnum;
  value: string;
  logicalOperator?: LogicalOperatorEnum;

  constructor(id: ReferenceEnum, operator: OperatorEnum, value: string) {
    this.id = id;
    this.operator = operator;
    this.value = value;
    this.logicalOperator = null;
  }
}
