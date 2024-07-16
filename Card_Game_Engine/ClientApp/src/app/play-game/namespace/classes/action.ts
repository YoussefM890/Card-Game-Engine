import {ActionEnum} from "../../../_reusable-components/action/namespace/enums/action.enum";
import {Parameter} from "./parameter";


export class Action {
  id: ActionEnum;
  parameters: Parameter[];

  constructor(id: number) {
    this.id = id;
    this.parameters = []
  }

  addParameter(parameter: Parameter) {
    this.parameters.push(parameter);
  }
}
