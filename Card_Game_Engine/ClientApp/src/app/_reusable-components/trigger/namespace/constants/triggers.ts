import {Trigger} from "../classes/trigger";
import {TriggerEnum} from "../enums/trigger.enum";
import {Parameter} from "../../../parameter/namespace/classes/parameter";
import {TriggerParameterEnum} from "../../../parameter/namespace/enums/parameter.enums";
import {ParameterValueTypeEnum} from "../../../parameter/namespace/enums/parameter-value-type.enum";
import {SelectOption} from "../../../../models/classes/select-option";
import {PositionsRelationOptionsEnum} from "../../../parameter/namespace/enums/parameter-value-options.enums";

const text = ParameterValueTypeEnum.Text;
const select = ParameterValueTypeEnum.Select;


export const triggers: Trigger[] = [
  new Trigger(TriggerEnum.GameStart, 'Game Start'),
  new Trigger(TriggerEnum.CardMoved, 'Card Moved', [
    new Parameter(TriggerParameterEnum.FromPosition, 'From Position'),
    new Parameter(TriggerParameterEnum.ToPosition, 'To Position'),
    new Parameter(TriggerParameterEnum.CardCount, 'Card Count'),
  ]),
  new Trigger(TriggerEnum.DeckCardCount, 'Deck Card Count', [
      new Parameter(TriggerParameterEnum.Position, 'Position'),
    new Parameter(TriggerParameterEnum.EqualTo, 'Equal To =', null, text, [], [
      TriggerParameterEnum.LessThan,
      TriggerParameterEnum.GreaterThan,
      TriggerParameterEnum.NotEqualTo,
    ]),
    new Parameter(TriggerParameterEnum.NotEqualTo, 'Not Equal To <>', null, text, [], [
      TriggerParameterEnum.EqualTo
    ]),
    new Parameter(TriggerParameterEnum.LessThan, 'Less Than <', null, text, [], [
      TriggerParameterEnum.EqualTo
    ]),
    new Parameter(TriggerParameterEnum.GreaterThan, 'Greater Than >', null, text, [], [
      TriggerParameterEnum.EqualTo
    ]),
    new Parameter(TriggerParameterEnum.PositionsRelation, 'Positions Relation (default is Sum)', null, select, [
      new SelectOption(PositionsRelationOptionsEnum.Sum, 'Sum', 'Sum of the cards counts at the selected positions'),
      new SelectOption(PositionsRelationOptionsEnum.Any, 'Any', 'Any of the cards counts at the selected positions'),
      new SelectOption(PositionsRelationOptionsEnum.All, 'All', 'All of the cards counts at the selected positions'),
    ]),
    ]),
];

