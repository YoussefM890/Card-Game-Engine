import {GameRule} from "./game-rule";
import {Card} from "./card";

export class CreateGame {
  rules: GameRule[]
  startingDeck: Card[]
  startingPosition: number
  width: number
  height: number

  constructor(rules: GameRule[], startingDeck: Card[], width: number, height: number, startingPosition: number = 0) {
    this.rules = rules;
    this.startingDeck = startingDeck;
    this.width = width;
    this.height = height;
    this.startingPosition = startingPosition;
  }
}
