import {GridItem} from "./grid-item";
import {ManualTrigger} from "../../../create-game/namespace/classes/manual-trigger";

export class Game {
  grid: GridItem[];
  width?: number
  height?: number
  manualTriggers?: ManualTrigger[]
  constructor(grid: GridItem[] = [], width: number = 0, height: number = 0) {
    this.grid = grid;
    this.width = width;
    this.height = height;
  }
}
