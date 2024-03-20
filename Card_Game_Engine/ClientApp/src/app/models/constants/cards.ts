import {ImageUrlEnum} from "../enums/image-url.enum";
import {Card} from "../classes/card";
import {CardNameEnum} from "../enums/card-name.enum";
import {SuitEnum} from "../enums/suit.enum";

export const AllDistinctCards : Card[] = [
  { id: 1, value: 1, suit: SuitEnum.HEARTS, name: CardNameEnum.ACE, imageUrl: ImageUrlEnum.HEARTS },
  { id: 2, value: 2, suit: SuitEnum.HEARTS, name: CardNameEnum.TWO, imageUrl: ImageUrlEnum.HEARTS },
  { id: 3, value: 3, suit: SuitEnum.HEARTS, name: CardNameEnum.THREE, imageUrl: ImageUrlEnum.HEARTS },
  { id: 4, value: 4, suit: SuitEnum.HEARTS, name: CardNameEnum.FOUR, imageUrl: ImageUrlEnum.HEARTS },
  { id: 5, value: 5, suit: SuitEnum.HEARTS, name: CardNameEnum.FIVE, imageUrl: ImageUrlEnum.HEARTS },
  { id: 6, value: 6, suit: SuitEnum.HEARTS, name: CardNameEnum.SIX, imageUrl: ImageUrlEnum.HEARTS },
  { id: 7, value: 7, suit: SuitEnum.HEARTS, name: CardNameEnum.SEVEN, imageUrl: ImageUrlEnum.HEARTS },
  { id: 8, value: 8, suit: SuitEnum.HEARTS, name: CardNameEnum.EIGHT, imageUrl: ImageUrlEnum.HEARTS },
  { id: 9, value: 9, suit: SuitEnum.HEARTS, name: CardNameEnum.NINE, imageUrl: ImageUrlEnum.HEARTS },
  { id: 10, value: 10, suit: SuitEnum.HEARTS, name: CardNameEnum.TEN, imageUrl: ImageUrlEnum.HEARTS },
  { id: 11, value: 11, suit: SuitEnum.HEARTS, name: CardNameEnum.JACK, imageUrl: ImageUrlEnum.HEARTS },
  { id: 12, value: 12, suit: SuitEnum.HEARTS, name: CardNameEnum.QUEEN, imageUrl: ImageUrlEnum.HEARTS },
  { id: 13, value: 13, suit: SuitEnum.HEARTS, name: CardNameEnum.KING, imageUrl: ImageUrlEnum.HEARTS },
  { id: 14, value: 14, suit: SuitEnum.OTHER, name: CardNameEnum.JOKER, imageUrl: ImageUrlEnum.JOKER },
];
