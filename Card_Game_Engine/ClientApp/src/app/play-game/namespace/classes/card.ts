import {SuitEnum} from "../../../create-game/namespace/enums/suit.enum";

export class Card {
  id: number
  value: number
  suit: SuitEnum
  name: string
  isFaceUp: boolean
}
