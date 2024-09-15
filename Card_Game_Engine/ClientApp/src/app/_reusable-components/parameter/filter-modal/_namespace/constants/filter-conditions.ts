import {FilterConditionTemplate} from "../classes/filter-condition-template";
import {ReferenceEnum} from "../enums/reference.enum";
import {Operator} from "../classes/operator";
import {OperatorEnum} from "../enums/operator.enum";
import {SelectOption} from "../../../../../shared/models/classes/select-option";
import {ValueTypeEnum} from "../enums/value-type.enum";
import {CardValueEnum} from "../../../../card/namespace/enums/card-name.enum";
import {SuitEnum} from "../../../../../create-game/namespace/enums/suit.enum";

export const filterConditions: Readonly<Record<ReferenceEnum, FilterConditionTemplate>> = {
  [ReferenceEnum.Suit]:
    new FilterConditionTemplate(ReferenceEnum.Suit, 'Suit', [
      new Operator(OperatorEnum.EqualTo),
      new Operator(OperatorEnum.NotEqualTo),
      // new Operator(OperatorEnum.In),
      // new Operator(OperatorEnum.NotIn),
    ], ValueTypeEnum.Select, [
      new SelectOption(SuitEnum.HEARTS, 'Hearts'),
      new SelectOption(SuitEnum.DIAMONDS, 'Diamonds'),
      new SelectOption(SuitEnum.CLUBS, 'Clubs'),
      new SelectOption(SuitEnum.SPADES, 'Spades'),
      new SelectOption(SuitEnum.OTHER, 'Other'),
    ]),
  [ReferenceEnum.FaceValue]:
    new FilterConditionTemplate(ReferenceEnum.FaceValue, 'Face Value', [
      new Operator(OperatorEnum.EqualTo),
      new Operator(OperatorEnum.NotEqualTo),
      new Operator(OperatorEnum.GreaterThan),
      new Operator(OperatorEnum.LessThan),
      new Operator(OperatorEnum.GreaterThanOrEqualTo),
      new Operator(OperatorEnum.LessThanOrEqualTo),
      // new Operator(OperatorEnum.In),
      // new Operator(OperatorEnum.NotIn),
    ], ValueTypeEnum.Select, [
      new SelectOption(CardValueEnum.Ace, 'Ace'),
      new SelectOption(CardValueEnum.Two, 'Two'),
      new SelectOption(CardValueEnum.Three, 'Three'),
      new SelectOption(CardValueEnum.Four, 'Four'),
      new SelectOption(CardValueEnum.Five, 'Five'),
      new SelectOption(CardValueEnum.Six, 'Six'),
      new SelectOption(CardValueEnum.Seven, 'Seven'),
      new SelectOption(CardValueEnum.Eight, 'Eight'),
      new SelectOption(CardValueEnum.Nine, 'Nine'),
      new SelectOption(CardValueEnum.Ten, 'Ten'),
      new SelectOption(CardValueEnum.Jack, 'Jack'),
      new SelectOption(CardValueEnum.Queen, 'Queen'),
      new SelectOption(CardValueEnum.King, 'King'),
    ]),
};
