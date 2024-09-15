import {IFilterNode} from "../interfaces/filter-node";
import {LogicalOperatorEnum} from "../enums/logical-operator.enum";
import {FilterCondition} from "./filter-condition";

export class FilterGroup implements IFilterNode {
  logicalOperator?: LogicalOperatorEnum;
  children: (FilterGroup | FilterCondition)[];

  constructor(children: (FilterGroup | FilterCondition)[] = [], logicalOperator: LogicalOperatorEnum = null) {
    this.logicalOperator = logicalOperator;
    this.children = children;
  }
}
