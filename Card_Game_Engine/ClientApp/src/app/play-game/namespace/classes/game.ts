import {GridItem} from "./grid-item";
import {ManualTrigger} from "../../../create-game/namespace/classes/manual-trigger";

export class Game {
  grid: GridItem[];
  player1Score: number;
  player2Score: number;
  width?: number
  height?: number
  manualTriggers?: ManualTrigger[]

  constructor(grid: GridItem[] = [], player1Score = 0, player2Score = 0, width: number = 0, height: number = 0) {
    this.grid = grid;
    this.player1Score = player1Score;
    this.player2Score = player2Score;
    this.width = width;
    this.height = height;
  }
}
