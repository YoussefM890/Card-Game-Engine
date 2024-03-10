import {Parameter} from "./parameter";
import {ActionEnum} from "../enums/action.enum";
import {ActionDisplayEnum} from "../enums/action-display-enum";
import {actionParameters} from "../constants/action-parameters";
import {parameters} from "../constants/parameters";

export class Action {
  id : number;
  name: string;
  display : string;
  parameters: Parameter[];
  constructor(name:string) {
    this.name = name;
    this.id = ActionEnum[name];
    this.display = ActionDisplayEnum[name];
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
