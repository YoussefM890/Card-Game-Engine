import {ParameterDisplayEnum} from "../enums/parameter-display.enum";
import {ParameterEnum} from "../enums/parameter.enum";

export class Parameter {
  id : ParameterEnum;
  key: string;
  display: ParameterDisplayEnum;
  value? : any;
  constructor(key:string) {
    this.key = key;
    this.id = ParameterEnum[key];
    this.display = ParameterDisplayEnum[key];
    this.value = null
  }
}
