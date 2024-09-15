import {ActionParameterEnum, TriggerParameterEnum} from "../enums/parameter.enums";
import {ParameterValueTypeEnum} from "../enums/parameter-value-type.enum";
import {FilterEnum} from "../../filter-modal/_namespace/enums/filter.enum";
import {SelectOption} from "../../../../shared/models/classes/select-option";

export class Parameter {
  id: ActionParameterEnum | TriggerParameterEnum;
  display: string;
  description?: string;
  value?: any;
  type?: ParameterValueTypeEnum;
  args?: SelectOption[] | FilterEnum;
  cannotBeUsedWith?: number[];
  canBeDuplicated?: boolean;

  constructor(
    id: ActionParameterEnum | TriggerParameterEnum,
    display: string,
    description = null,
    type = ParameterValueTypeEnum.Text,
    args: SelectOption[] | FilterEnum = [],
    cannotBeUsedWith = [],
    canBeDuplicated = false
  ) {
    this.id = id;
    this.display = display;
    this.value = description;
    this.description = description;
    this.type = type ?? ParameterValueTypeEnum.Text;
    this.args = args ?? [];
    this.cannotBeUsedWith = cannotBeUsedWith ?? [];
    this.canBeDuplicated = canBeDuplicated ?? false;
    this.value = null
  }
}
