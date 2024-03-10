import {ActionParameter} from "../classes/action-parameter";
import {ActionEnum} from "../enums/action.enum";
import {ParameterEnum} from "../enums/parameter.enum";

export const actionParameters:ActionParameter[] = [
  {
    actionId: ActionEnum.StartGame,
    parameterId: ParameterEnum.CardCount,
    isRequired: true
  },
  {
    actionId : ActionEnum.ShuffleDeck,
    parameterId: ParameterEnum.ShuffleCount,
    isRequired: true
  }
]
