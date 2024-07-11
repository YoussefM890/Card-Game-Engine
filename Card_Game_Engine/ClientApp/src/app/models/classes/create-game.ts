import {GameRule} from "./game-rule";
import {Card} from "./card";
import {create_game} from "../../create-game/create-game.namespace";

export class CreateGame {
  rules: GameRule[]
  startingDeck: Card[]
  startingPosition: number
  grid: Record<number, create_game.GridItem>
  width: number
  height: number

  constructor(
    rules: GameRule[],
    width: number, height: number,
    startingDeck: Card[] = [],
    grid: Record<number, create_game.GridItem> = {},
    startingPosition: number = 0
  ) {
    this.rules = rules;
    this.width = width;
    this.height = height;
    this.startingDeck = startingDeck;
    this.grid = grid;
    this.startingPosition = startingPosition;
  }
}
