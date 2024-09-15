import {OperatorEnum, OperatorEnumView} from "../enums/operator.enum";

export class Operator {
  id: OperatorEnum;
  display: string;

  constructor(id: OperatorEnum, display?: string) {
    this.id = id;
    this.display = display || OperatorEnumView[id];
  }
}
