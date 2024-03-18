import {Parameter} from "./parameter";
import {parameters} from "../constants/parameters";
import {triggerParameters} from "../constants/trigger-parameters";

export class Trigger {
  id : number;
  display: string;
  parameters: Parameter[];

  constructor(id: number, display: string) {
    this.id = id;
    this.display = display;
    const relevantActionParameters = triggerParameters.filter(ap => ap.triggerId === this.id);
    this.parameters = relevantActionParameters.map(ap => {
      const matchedParameter = parameters.find(p => p.id === ap.parameterId);
      if (matchedParameter) {
        return matchedParameter;
      }
      throw new Error(`Parameter with ID ${ap.parameterId} not found`); // Handle missing parameters
    });
  }
}
