import {Parameter, ParameterDTO} from "./parameter";
import {ActionEnum} from "../enums/action.enum";
import {actionParameters} from "../constants/action-parameters";
import {parameters} from "../constants/parameters";

export class Action {
  id: ActionEnum;
  display : string;
  parameters: Parameter[];

  constructor(id: number, display: string) {
    this.id = id;
    this.display = display;
    const relevantActionParameters = actionParameters.filter(ap => ap.actionId === this.id);
    this.parameters = relevantActionParameters.map(ap => {
      const matchedParameter = parameters.find(p => p.id === ap.parameterId);
      if (matchedParameter) {
        return matchedParameter;
      }
      throw new Error(`Parameter with ID ${ap.parameterId} not found`); // Handle missing parameters
    });
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
