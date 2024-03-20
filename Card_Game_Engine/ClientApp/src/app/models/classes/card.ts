import {SuitEnum} from "../enums/suit.enum";
import {ImageUrlEnum} from "../enums/image-url.enum";
import {CardNameEnum} from "../enums/card-name.enum";

export class Card {
  id: number;
  value: number;
  suit: SuitEnum;
  name: CardNameEnum | string;
  imageUrl?: ImageUrlEnum;
  constructor(id: number, value: number, suit: SuitEnum,name: string, imageUrl?: ImageUrlEnum) {
    this.id = id;
    this.value = value;
    this.suit = suit;
    this.name = name;
    this.imageUrl = imageUrl?? null;
  }
}
