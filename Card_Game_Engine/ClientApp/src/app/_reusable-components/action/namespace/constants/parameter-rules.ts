import {ActionEnum} from "../enums/action.enum";
import {ActionParameterEnum} from "../../../parameter/namespace/enums/parameter.enums";

export const parameterRules = {
  [ActionEnum.MoveCard]: [
    {
      parameter: ActionParameterEnum.FromPosition,
      cannotBeUsedWith: [ActionParameterEnum.FromPosition]
    },
    {
      parameter: ActionParameterEnum.ToPosition,
      cannotBeUsedWith: [ActionParameterEnum.ToPosition]
    },
  ]
};
