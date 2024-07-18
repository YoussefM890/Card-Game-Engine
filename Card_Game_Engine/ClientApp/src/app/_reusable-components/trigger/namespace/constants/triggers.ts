import {Trigger} from "../classes/trigger";
import {TriggerEnum} from "../enums/trigger.enum";
import {Parameter} from "../../../parameter/namespace/classes/parameter";
import {TriggerParameterEnum} from "../../../parameter/namespace/enums/parameter.enums";
import {ParameterValueTypeEnum} from "../../../parameter/namespace/enums/parameter-value-type.enum";

const text = ParameterValueTypeEnum.Text;
const select = ParameterValueTypeEnum.Select;


export const triggers: Trigger[] = [
  new Trigger(TriggerEnum.GameStart, 'Game Start'),
  new Trigger(TriggerEnum.CardMoved, 'Card Moved', [
    new Parameter(TriggerParameterEnum.FromPosition, 'From Position'),
    new Parameter(TriggerParameterEnum.ToPosition, 'To Position'),
    new Parameter(TriggerParameterEnum.CardCount, 'Card Count'),
  ]),
  new Trigger(TriggerEnum.DeckCardCount, 'Deck Card Count',
    [
      new Parameter(TriggerParameterEnum.Position, 'Position'),
      new Parameter(TriggerParameterEnum.EqualTo, 'Equal To ='),
      new Parameter(TriggerParameterEnum.NotEqualTo, 'Not Equal To <>'),
      new Parameter(TriggerParameterEnum.LessThan, 'Less Than <'),
      new Parameter(TriggerParameterEnum.GreaterThan, 'Greater Than >'),
    ]),
];

