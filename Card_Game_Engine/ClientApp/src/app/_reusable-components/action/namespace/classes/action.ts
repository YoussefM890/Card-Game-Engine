import {ActionEnum} from "../enums/action.enum";
import {Parameter} from "../../../parameter/namespace/classes/parameter";

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
