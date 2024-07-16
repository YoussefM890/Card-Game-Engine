import {Card} from "./card";
import {Rule} from "../../../_reusable-components/rule/namespace/classes/rule";
import {GridItem} from "./grid-item";

export class Game {
  rules: Rule[]
  startingDeck: Card[]
  startingPosition: number
  grid: Record<number, GridItem>
  width: number
  height: number

  constructor(
    rules: Rule[],
    width: number, height: number,
    startingDeck: Card[] = [],
    grid: Record<number, GridItem> = {},
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
