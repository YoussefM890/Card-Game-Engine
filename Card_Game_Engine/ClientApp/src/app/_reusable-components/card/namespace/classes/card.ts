import {SuitEnum} from "../../../../create-game/namespace/enums/suit.enum";
import {CardNameEnum} from "../enums/card-name.enum";
import {ImagePathEnum} from "../constants/image-path.enum";

export class Card {
  id: number;
  value: number;
  suit: SuitEnum;
  name: CardNameEnum | string;
  imagePath?: ImagePathEnum;
  isFaceUp: boolean = true;
  isPlayable: boolean = true;

  constructor(id: number, value: number, suit: SuitEnum, name: string, imageUrl?: ImagePathEnum) {
    this.id = id;
    this.value = value;
    this.suit = suit;
    this.name = name;
    this.imagePath = imageUrl ?? null;
  }
}
