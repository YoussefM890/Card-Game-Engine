import { Component } from '@angular/core';
import {CardComponent} from "../card/card.component";
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CardComponent,
    MatGridListModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  grid = []; // This would be initialized based on your grid size, e.g., 5x5
  selectedPositions = new Set();

  constructor() {
    this.initializeGrid(7, 10); // Example for a 5x5 grid
  }

  initializeGrid(rows: number, cols: number) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.grid.push({ row, col, id: `${String.fromCharCode(65 + row)}${col + 1}`, isSelected: false });
      }
    }
  }

  selectPosition(position) {
    if (this.selectedPositions.has(position.id)) {
      this.selectedPositions.delete(position.id);
      position.isSelected = false;
    } else {
      this.selectedPositions.add(position.id);
      position.isSelected = true;
    }
  }
}
