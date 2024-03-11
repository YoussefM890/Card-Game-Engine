import {ParameterEnum} from "../enums/parameter.enum";

export class Parameter {
  id : ParameterEnum;
  display: string;
  value? : any;

  constructor(id: ParameterEnum, display: string) {
    this.id = id;
    this.display = display;
    this.value = null
  }
}
