import {Trigger} from "../classes/trigger";
import {TriggerEnum} from "../enums/trigger.enum";
import {Parameter} from "../../../parameter/namespace/classes/parameter";
import {TriggerParameterEnum} from "../../../parameter/namespace/enums/parameter.enums";
import {ParameterValueTypeEnum} from "../../../parameter/namespace/enums/parameter-value-type.enum";
import {
  AggregationOptionEnum,
  PositionsRelationOptionEnum,
  TriggerBehaviorOptionEnum
} from "../../../parameter/namespace/enums/parameter-value-options.enums";
import {SelectOption} from "../../../../shared/models/classes/select-option";
import {FilterEnum} from "../../../parameter/filter-modal/_namespace/enums/filter.enum";

const text = ParameterValueTypeEnum.Text;
const select = ParameterValueTypeEnum.Select;
const positions = ParameterValueTypeEnum.Positions;
const filter = ParameterValueTypeEnum.Filter;
const formula = ParameterValueTypeEnum.Formula;
const multiSelect = ParameterValueTypeEnum.MultiSelect;


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

  new Trigger(TriggerEnum.Formula, 'Formula', [
    new Parameter(TriggerParameterEnum.Condition, 'Condition', 'The formula to be evaluated', formula),
  ]),

  new Trigger(TriggerEnum.ScoreSingle, 'Score (Single Player)', [
    // Single player selector
    new Parameter(TriggerParameterEnum.Player, 'Player', null, select, [], [
      TriggerParameterEnum.PlayerA,
      TriggerParameterEnum.PlayerB,
      TriggerParameterEnum.Players,
    ]),

    // Comparators
    new Parameter(TriggerParameterEnum.EqualTo, 'Equal To =', null, text, [], [
      TriggerParameterEnum.LessThan,
      TriggerParameterEnum.GreaterThan,
      TriggerParameterEnum.NotEqualTo,
    ]),
    new Parameter(TriggerParameterEnum.NotEqualTo, 'Not Equal To <>', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.LessThan,
      TriggerParameterEnum.GreaterThan,
    ]),
    new Parameter(TriggerParameterEnum.LessThan, 'Less Than <', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.NotEqualTo,
      TriggerParameterEnum.GreaterThan,
    ]),
    new Parameter(TriggerParameterEnum.GreaterThan, 'Greater Than >', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.NotEqualTo,
      TriggerParameterEnum.LessThan,
    ]),

    // Behavior
    new Parameter(TriggerParameterEnum.TriggerBehavior, 'Trigger Behavior (default is On Change)', null, select, [
      new SelectOption(TriggerBehaviorOptionEnum.OnChange, 'On Change', 'Triggers on score change: Player 1 for P1, Player 2 for P2'),
      new SelectOption(TriggerBehaviorOptionEnum.Continuous, 'Continuous', 'Triggers continuously while the score meets the conditions'),
    ]),
  ]),

  new Trigger(TriggerEnum.ScoreGroup, 'Score (Group Aggregate)', [
    // Multiple players selector
    new Parameter(TriggerParameterEnum.Players, 'Players', null, multiSelect, [], [
      TriggerParameterEnum.PlayerA,
      TriggerParameterEnum.PlayerB,
      TriggerParameterEnum.Player,
    ]),

    // Aggregate
    new Parameter(TriggerParameterEnum.Aggregate, 'Aggregate', 'For Group Aggregate mode', select, [
      new SelectOption(AggregationOptionEnum.Max, 'Max (Highest)'),
      new SelectOption(AggregationOptionEnum.Min, 'Min (Lowest)'),
      new SelectOption(AggregationOptionEnum.Sum, 'Sum'),
      new SelectOption(AggregationOptionEnum.Avg, 'Average'),
      new SelectOption(AggregationOptionEnum.Any, 'Any'),
      new SelectOption(AggregationOptionEnum.All, 'All'),
    ]),

    // Comparators
    new Parameter(TriggerParameterEnum.EqualTo, 'Equal To =', null, text, [], [
      TriggerParameterEnum.LessThan,
      TriggerParameterEnum.GreaterThan,
      TriggerParameterEnum.NotEqualTo,
    ]),
    new Parameter(TriggerParameterEnum.NotEqualTo, 'Not Equal To <>', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.LessThan,
      TriggerParameterEnum.GreaterThan,
    ]),
    new Parameter(TriggerParameterEnum.LessThan, 'Less Than <', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.NotEqualTo,
      TriggerParameterEnum.GreaterThan,
    ]),
    new Parameter(TriggerParameterEnum.GreaterThan, 'Greater Than >', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.NotEqualTo,
      TriggerParameterEnum.LessThan,
    ]),

    // Behavior
    new Parameter(TriggerParameterEnum.TriggerBehavior, 'Trigger Behavior (default is On Change)', null, select, [
      new SelectOption(TriggerBehaviorOptionEnum.OnChange, 'On Change', 'Triggers when the chosen aggregate changes to meet the condition'),
      new SelectOption(TriggerBehaviorOptionEnum.Continuous, 'Continuous', 'Triggers continuously while the aggregate meets the condition'),
    ]),
  ]),

  new Trigger(TriggerEnum.ScorePair, 'Score (Pairwise Difference)', [
    // Pairwise selectors
    new Parameter(TriggerParameterEnum.PlayerA, 'Player A', null, select),
    new Parameter(TriggerParameterEnum.PlayerB, 'Player B', null, select, [], [
      TriggerParameterEnum.Player, // kept like your original structure
      TriggerParameterEnum.Players,
    ]),

    // Comparators (applied to Score(A) - Score(B))
    new Parameter(TriggerParameterEnum.EqualTo, 'Equal To =', null, text, [], [
      TriggerParameterEnum.LessThan,
      TriggerParameterEnum.GreaterThan,
      TriggerParameterEnum.NotEqualTo,
    ]),
    new Parameter(TriggerParameterEnum.NotEqualTo, 'Not Equal To <>', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.LessThan,
      TriggerParameterEnum.GreaterThan,
    ]),
    new Parameter(TriggerParameterEnum.LessThan, 'Less Than <', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.NotEqualTo,
      TriggerParameterEnum.GreaterThan,
    ]),
    new Parameter(TriggerParameterEnum.GreaterThan, 'Greater Than >', null, text, [], [
      TriggerParameterEnum.EqualTo,
      TriggerParameterEnum.NotEqualTo,
      TriggerParameterEnum.LessThan,
    ]),

    // Behavior
    new Parameter(TriggerParameterEnum.TriggerBehavior, 'Trigger Behavior (default is On Change)', null, select, [
      new SelectOption(TriggerBehaviorOptionEnum.OnChange, 'On Change', 'Triggers when Score(A) - Score(B) changes to meet the condition'),
      new SelectOption(TriggerBehaviorOptionEnum.Continuous, 'Continuous', 'Triggers continuously while Score(A) - Score(B) meets the condition'),
    ]),
  ]),

];

