import {TriggerParameterEnum} from "../../../_reusable-components/parameter/namespace/enums/parameter.enums";

class ActionParameterEnum {
}

export class Parameter {
  id: ActionParameterEnum | TriggerParameterEnum;
  value: string;

  constructor(id: ActionParameterEnum | TriggerParameterEnum, value: string) {
    this.id = id;
    this.value = value;
  }
}
