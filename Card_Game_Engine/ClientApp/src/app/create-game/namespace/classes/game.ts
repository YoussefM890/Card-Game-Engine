import {Card} from "./card";
import {Rule} from "../../../_reusable-components/rule/namespace/classes/rule";
import {GridItem} from "./grid-item";
import {ManualTrigger} from "./manual-trigger";
import {Player} from "./player";

export class Game {
  rules: Rule[]
  startingDeck: Card[]
  grid: Record<number, GridItem>
  width: number
  height: number
  manualTriggers: ManualTrigger[]
  players: Player[]

  constructor(
    rules: Rule[],
    width: number, height: number,
    startingDeck: Card[] = [],
    grid: Record<number, GridItem> = {},
    manualTriggers: ManualTrigger[] = []
  ) {
    this.rules = rules;
    this.width = width;
    this.height = height;
    this.startingDeck = startingDeck;
    this.grid = grid;
    this.manualTriggers = manualTriggers;
  }
}
