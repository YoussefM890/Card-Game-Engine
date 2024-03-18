import {TriggerParameter} from "../classes/trigger-parameter";
import {TriggerEnum} from "../enums/trigger.enum";
import {ParameterEnum} from "../enums/parameter.enum";

export const triggerParameters:TriggerParameter[] = [
  {
    triggerId: TriggerEnum.CardMoved,
    parameterId : ParameterEnum.FromPosition,
    isRequired: false
  },
  {
    triggerId: TriggerEnum.CardMoved,
    parameterId : ParameterEnum.ToPosition,
    isRequired: false
  },
  {
    triggerId: TriggerEnum.CardMoved,
    parameterId: ParameterEnum.By,
    isRequired: false
  }
]
