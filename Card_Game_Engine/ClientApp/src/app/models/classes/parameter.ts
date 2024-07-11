import {ParameterEnum} from "../enums/parameter.enum";
import {ParameterValueTypeEnum} from "../enums/parameter-value-type.enum";

export class Parameter {
  id : ParameterEnum;
  display: string;
  value? : any;
  type?: ParameterValueTypeEnum;
  args?: any[];

  constructor(id: ParameterEnum, display: string, type = ParameterValueTypeEnum.Text, args = []) {
    this.id = id;
    this.display = display;
    this.value = null
    this.type = type ?? ParameterValueTypeEnum.Text;
    this.args = args ?? [];
  }
}

export class ParameterDTO {
  id: ParameterEnum;
  value: string;

  constructor(id: ParameterEnum, value: string) {
    this.id = id;
    this.value = value;
  }
}
