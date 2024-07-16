import {ActionParameterEnum, TriggerParameterEnum} from "../enums/parameter.enums";
import {ParameterValueTypeEnum} from "../enums/parameter-value-type.enum";

export class Parameter {
  id: ActionParameterEnum | TriggerParameterEnum;
  display: string;
  value?: any;
  type?: ParameterValueTypeEnum;
  args?: any[];
  cannotBeUsedWith?: number[];
  canBeDuplicated?: boolean;

  constructor(
    id: ActionParameterEnum | TriggerParameterEnum,
    display: string, type = ParameterValueTypeEnum.Text,
    args = [],
    cannotBeUsedWith = [],
    canBeDuplicated = false
  ) {
    this.id = id;
    this.display = display;
    this.value = null
    this.type = type ?? ParameterValueTypeEnum.Text;
    this.args = args ?? [];
    this.cannotBeUsedWith = cannotBeUsedWith ?? [];
    this.canBeDuplicated = canBeDuplicated ?? false;
  }
}
