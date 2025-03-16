import {Trigger} from "../classes/trigger";
import {TriggerEnum} from "../enums/trigger.enum";
import {Parameter} from "../../../parameter/namespace/classes/parameter";
import {TriggerParameterEnum} from "../../../parameter/namespace/enums/parameter.enums";
import {ParameterValueTypeEnum} from "../../../parameter/namespace/enums/parameter-value-type.enum";
import {
  PositionsRelationOptionEnum,
  ScoreTypeOptionEnum,
  TriggerBehaviorOptionEnum
} from "../../../parameter/namespace/enums/parameter-value-options.enums";
import {SelectOption} from "../../../../shared/models/classes/select-option";
import {FilterEnum} from "../../../parameter/filter-modal/_namespace/enums/filter.enum";

const text = ParameterValueTypeEnum.Text;
const select = ParameterValueTypeEnum.Select;
const positions = ParameterValueTypeEnum.Positions;
const filter = ParameterValueTypeEnum.Filter;
const formula = ParameterValueTypeEnum.Formula;


export const triggers: Trigger[] = [
  new Trigger(TriggerEnum.GameStart, 'Game Start'),
  new Trigger(TriggerEnum.CardMoved, 'Card Moved', [
    new Parameter(TriggerParameterEnum.FromPosition, 'From Position'),
    new Parameter(TriggerParameterEnum.ToPosition, 'To Position'),
    new Parameter(TriggerParameterEnum.CardCount, 'Card Count'),
  ]),
  new Trigger(TriggerEnum.DeckCardCount, 'Deck Card Count', [
    new Parameter(TriggerParameterEnum.Positions, 'Positions', null, positions),
    new Parameter(TriggerParameterEnum.Filter, 'Card Filter', null, filter, FilterEnum.Card),
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
      new SelectOption(PositionsRelationOptionEnum.Sum, 'Sum', 'Sum of the cards counts at the selected positions'),
      new SelectOption(PositionsRelationOptionEnum.Any, 'Any', 'Any of the cards counts at the selected positions'),
      new SelectOption(PositionsRelationOptionEnum.All, 'All', 'All of the cards counts at the selected positions'),
    ]),
  ]),
  new Trigger(TriggerEnum.Score, 'Score', [
    new Parameter(TriggerParameterEnum.ScoreType, 'Score Type', null, select, [
      new SelectOption(ScoreTypeOptionEnum.Player1, 'Player 1 Score', 'The current score of Player 1'),
      new SelectOption(ScoreTypeOptionEnum.Player2, 'Player 2 Score', 'The current score of Player 2'),
      new SelectOption(ScoreTypeOptionEnum.Highest, 'Highest Score', 'The highest score among both players'),
      new SelectOption(ScoreTypeOptionEnum.Lowest, 'Lowest Score', 'The lowest score among both players'),
      new SelectOption(ScoreTypeOptionEnum.Any, 'Any Score', 'Triggers if any player\'s score meets the conditions'),
      new SelectOption(ScoreTypeOptionEnum.All, 'All Scores', 'Triggers only if both players\' scores meet the conditions'),
      new SelectOption(ScoreTypeOptionEnum.Difference, 'Score Difference', 'The difference between Player 1 and Player 2 scores (Player 1 - Player 2)'),
    ]),
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
    new Parameter(TriggerParameterEnum.TriggerBehavior, 'Trigger Behavior (default is On Change)', null, select, [
      new SelectOption(TriggerBehaviorOptionEnum.OnChange, 'On Change', 'Triggers on score change: Player 1 score for Player 1 option, Player 2 score for Player 2 option, either score for other options'),
      new SelectOption(TriggerBehaviorOptionEnum.Continuous, 'Continuous', 'Triggers continuously while the score meets the conditions'),
    ]),
  ]),
  new Trigger(TriggerEnum.Formula, 'Formula', [
    new Parameter(TriggerParameterEnum.Condition, 'Condition', 'The formula to be evaluated', formula),
  ]),
];

