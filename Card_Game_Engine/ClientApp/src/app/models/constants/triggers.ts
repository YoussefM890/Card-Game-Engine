import {Trigger} from "../classes/trigger";
import {TriggerEnum} from "../enums/trigger.enum";
import {Parameter} from "../classes/parameter";
import {TriggerParameterEnum} from "../enums/parameter.enums";

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

0.
