import {Trigger} from "./trigger";
import {Action} from "./action";

export interface GameRule {
  triggers: Trigger[];
  actions: Action[];
  rules: GameRule[];
}
