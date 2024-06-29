import {GameRule} from "./game-rule";
import {Card} from "./card";

export class CreateGame {
  rules: GameRule[]
  startingDeck: Card[]
  position: number

  constructor(rules: GameRule[], startingDeck: any, startingPosition: number = 0) {
    this.rules = rules;
    this.startingDeck = startingDeck;
    this.position = startingPosition;
  }
}
