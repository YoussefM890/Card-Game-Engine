import {ActionEnum} from "../enums/action.enum";
import {ParameterEnum} from "../enums/parameter.enum";

export class ActionParameter {
  actionId: ActionEnum;
  parameterId: ParameterEnum;
  isRequired: boolean;
}
