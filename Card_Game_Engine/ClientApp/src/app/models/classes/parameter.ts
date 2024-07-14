import {ActionParameterEnum, TriggerParameterEnum} from "../enums/parameter.enums";
import {ParameterValueTypeEnum} from "../enums/parameter-value-type.enum";

export class Parameter {
  id: ActionParameterEnum | TriggerParameterEnum;
  display: string;
  value? : any;
  type?: ParameterValueTypeEnum;
  args?: any[];

  constructor(id: ActionParameterEnum | TriggerParameterEnum, display: string, type = ParameterValueTypeEnum.Text, args = []) {
    this.id = id;
    this.display = display;
    this.value = null
    this.type = type ?? ParameterValueTypeEnum.Text;
    this.args = args ?? [];
  }
}

export class ParameterDTO {
  id: ActionParameterEnum | TriggerParameterEnum;
  value: string;

  constructor(id: ActionParameterEnum | TriggerParameterEnum, value: string) {
    this.id = id;
    this.value = value;
  }
}
