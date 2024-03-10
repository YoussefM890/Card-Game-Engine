import {Trigger} from "./trigger";
import {Action} from "./action";

export interface GameRule {
  trigger: Trigger;
  actions: Action[];
}
