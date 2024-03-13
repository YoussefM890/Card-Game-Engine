import {TriggerParameter} from "../classes/trigger-parameter";
import {TriggerEnum} from "../enums/trigger.enum";
import {ParameterEnum} from "../enums/parameter.enum";

export const triggerParameters:TriggerParameter[] = [
  {
    triggerId : TriggerEnum.CardMovedFromPosition,
    parameterId : ParameterEnum.FromPosition,
    isRequired: true
  },
  {
    triggerId : TriggerEnum.CardMovedToPosition,
    parameterId : ParameterEnum.ToPosition,
    isRequired: true
  }
]
