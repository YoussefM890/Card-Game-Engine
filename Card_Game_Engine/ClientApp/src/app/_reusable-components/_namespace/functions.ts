import {deepCopy} from "../../shared/functions/global";
import {ActionParameterEnum, TriggerParameterEnum} from "../parameter/namespace/enums/parameter.enums";
import {Parameter} from "../parameter/namespace/classes/parameter";


export function getAvailableParameters(availableParameters: Parameter[], usedParameters: (Set<ActionParameterEnum | TriggerParameterEnum>)): Parameter[] {
  if (!availableParameters) return [];
  for (const parameter of deepCopy<Parameter[]>(availableParameters)) {
    if (
      (!parameter.canBeDuplicated && usedParameters.has(parameter.id)) ||
      (parameter.cannotBeUsedWith.some(id => usedParameters.has(id)))
    ) {
      availableParameters = availableParameters.filter(p => p.id !== parameter.id);
    }
  }
  return availableParameters;
}
