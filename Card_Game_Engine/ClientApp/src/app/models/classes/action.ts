import {Parameter, ParameterDTO} from "./parameter";
import {ActionEnum} from "../enums/action.enum";

export class Action {
  id: ActionEnum;
  display: string;
  parameters: Parameter[];

  constructor(id: number, display: string, parameters: Parameter[] = []) {
    this.id = id;
    this.display = display;
    this.parameters = parameters;
  }
}

export class ActionDTO {
  id: ActionEnum;
  parameters: ParameterDTO[];

  constructor(id: number) {
    this.id = id;
    this.parameters = []
  }

  addParameter(parameter: ParameterDTO) {
    this.parameters.push(parameter);
  }
}
