import {Trigger} from "../../../trigger/namespace/classes/trigger";
import {Action} from "../../../action/namespace/classes/action";

export interface Rule {
  triggers: Trigger[];
  actions: Action[];
  rules: Rule[];
}
