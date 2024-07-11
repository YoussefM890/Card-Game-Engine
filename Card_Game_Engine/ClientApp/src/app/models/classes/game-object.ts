import {GridTransferItem} from "./grid-transfer-item";

export class GameObject {
  grid: GridTransferItem[];
  width?: number
  height?: number

  constructor(grid: GridTransferItem[] = [], width: number = 0, height: number = 0) {
    this.grid = grid;
    this.width = width;
    this.height = height;
  }
}
