import {GridItem} from "./grid-item";

export class GameObject {
  grid: GridItem[];

  constructor(grid: GridItem[] = []) {
    this.grid = grid;
  }
}
