import {GridItem} from "./grid-item";

export class GameObject {
  grid: GridItem[];
  width?: number
  height?: number

  constructor(grid: GridItem[] = [], width: number = 0, height: number = 0) {
    this.grid = grid;
    this.width = width;
    this.height = height;
  }
}
