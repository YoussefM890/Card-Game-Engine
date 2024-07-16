import {Card} from "../classes/card";
import {SuitEnum} from "../../../../create-game/namespace/enums/suit.enum";
import {CardNameEnum} from "../enums/card-name.enum";
import {ListToObject} from "../../../../shared/functions/global";
import {ImagePathEnum} from "./image-path.enum";

export const distinctCardsList: Card[] = [
  new Card(1, 1, SuitEnum.HEARTS, CardNameEnum.ACE),
  new Card(2, 2, SuitEnum.HEARTS, CardNameEnum.TWO),
  new Card(3, 3, SuitEnum.HEARTS, CardNameEnum.THREE),
  new Card(4, 4, SuitEnum.HEARTS, CardNameEnum.FOUR),
  new Card(5, 5, SuitEnum.HEARTS, CardNameEnum.FIVE),
  new Card(6, 6, SuitEnum.HEARTS, CardNameEnum.SIX),
  new Card(7, 7, SuitEnum.HEARTS, CardNameEnum.SEVEN),
  new Card(8, 8, SuitEnum.HEARTS, CardNameEnum.EIGHT),
  new Card(9, 9, SuitEnum.HEARTS, CardNameEnum.NINE),
  new Card(10, 10, SuitEnum.HEARTS, CardNameEnum.TEN),
  new Card(11, 11, SuitEnum.HEARTS, CardNameEnum.JACK, ImagePathEnum.JACK),
  new Card(12, 12, SuitEnum.HEARTS, CardNameEnum.QUEEN, ImagePathEnum.QUEEN),
  new Card(13, 13, SuitEnum.HEARTS, CardNameEnum.KING, ImagePathEnum.KING),
  new Card(14, 14, SuitEnum.OTHER, CardNameEnum.JOKER, ImagePathEnum.JOKER),
];

export const distinctCardsIdObject = ListToObject(distinctCardsList, 'id');
export const distinctCardsNameObject = ListToObject(distinctCardsList, 'name');
export const distinctCardsValueObject = ListToObject(distinctCardsList, 'value');
