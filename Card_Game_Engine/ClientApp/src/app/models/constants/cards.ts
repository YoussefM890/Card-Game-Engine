import {ImageUrlEnum} from "../enums/image-url.enum";
import {Card} from "../classes/card";
import {CardNameEnum} from "../enums/card-name.enum";
import {SuitEnum} from "../enums/suit.enum";
import {ListToObject} from "../functions";

export const distinctCardsList : Card[] = [
  { id: 1, value: 1, suit: SuitEnum.HEARTS, name: CardNameEnum.ACE},
  { id: 2, value: 2, suit: SuitEnum.HEARTS, name: CardNameEnum.TWO},
  { id: 3, value: 3, suit: SuitEnum.HEARTS, name: CardNameEnum.THREE},
  { id: 4, value: 4, suit: SuitEnum.HEARTS, name: CardNameEnum.FOUR},
  { id: 5, value: 5, suit: SuitEnum.HEARTS, name: CardNameEnum.FIVE},
  { id: 6, value: 6, suit: SuitEnum.HEARTS, name: CardNameEnum.SIX},
  { id: 7, value: 7, suit: SuitEnum.HEARTS, name: CardNameEnum.SEVEN},
  { id: 8, value: 8, suit: SuitEnum.HEARTS, name: CardNameEnum.EIGHT},
  { id: 9, value: 9, suit: SuitEnum.HEARTS, name: CardNameEnum.NINE},
  { id: 10, value: 10, suit: SuitEnum.HEARTS, name: CardNameEnum.TEN},
  { id: 11, value: 11, suit: SuitEnum.HEARTS, name: CardNameEnum.JACK, imageUrl: ImageUrlEnum.JACK },
  { id: 12, value: 12, suit: SuitEnum.HEARTS, name: CardNameEnum.QUEEN, imageUrl: ImageUrlEnum.QUEEN },
  { id: 13, value: 13, suit: SuitEnum.HEARTS, name: CardNameEnum.KING, imageUrl: ImageUrlEnum.KING },
  { id: 14, value: 14, suit: SuitEnum.OTHER, name: CardNameEnum.JOKER, imageUrl: ImageUrlEnum.JOKER },
];
export const distinctCardsIdObject = ListToObject(distinctCardsList, 'id');
export const distinctCardsNameObject = ListToObject(distinctCardsList, 'name');
export const distinctCardsValueObject = ListToObject(distinctCardsList, 'value');
