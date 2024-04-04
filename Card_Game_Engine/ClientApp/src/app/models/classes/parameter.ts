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

export class ParameterDTO {
  id: ParameterEnum;
  value: any;

  constructor(id: ParameterEnum, value: any) {
    this.id = id;
    this.value = value;
  }
}
