import {Parameter} from "./parameter";

export class Trigger {
  id : number;
  display: string;
  parameters: Parameter[];

  constructor(id: number, display: string, parameters: Parameter[] = []) {
    this.id = id;
    this.display = display;
    this.parameters = parameters;
  }
}
