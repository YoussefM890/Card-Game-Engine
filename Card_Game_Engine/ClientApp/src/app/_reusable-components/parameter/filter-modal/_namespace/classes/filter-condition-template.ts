import {ReferenceEnum} from "../enums/reference.enum";
import {Operator} from "./operator";
import {ValueTypeEnum} from "../enums/value-type.enum";
import {SelectOption} from "../../../../../shared/models/classes/select-option";

export class FilterConditionTemplate {
  id: ReferenceEnum;
  name: string;
  operators: Operator[];
  valueType: ValueTypeEnum;
  valueOptions?: SelectOption[];

  constructor(
    id: ReferenceEnum,
    name: string,
    operators: Operator[] = [],
    valueType: ValueTypeEnum = ValueTypeEnum.Text,
    valueOptions: SelectOption[] = null
  ) {
    this.id = id;
    this.name = name;
    this.operators = operators;
    this.valueType = valueType;
    this.valueOptions = valueOptions || (valueType === ValueTypeEnum.Select ? [] : null);
  }
}
