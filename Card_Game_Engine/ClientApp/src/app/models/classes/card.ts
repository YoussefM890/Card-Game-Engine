import {SuitEnum} from "../enums/suit.enum";
import {ImagePathEnum} from "../enums/image-path.enum";
import {CardNameEnum} from "../enums/card-name.enum";

export class Card {
  id: number;
  value: number;
  suit: SuitEnum;
  name: CardNameEnum | string;
  imagePath?: ImagePathEnum;
  isFaceUp: boolean = false;
  isPlayable: boolean = false;

  constructor(id: number, value: number, suit: SuitEnum, name: string, imageUrl?: ImagePathEnum) {
    this.id = id;
    this.value = value;
    this.suit = suit;
    this.name = name;
    this.imagePath = imageUrl ?? null;
  }
}
