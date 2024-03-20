import {Component, HostListener, Input, OnInit} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgStyle} from "@angular/common";
import {Card} from "../models/classes/card";
import {SuitEnum} from "../models/enums/suit.enum";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CardComponent,
    MatGridListModule,
    NgStyle,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent implements OnInit {
  @Input() rows: number = 7;
  @Input() cols: number = 10;
  @Input() cards : Card[] = [];
  @Input() overlap: boolean = false;
  grid = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeGrid();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adjustGridBasedOnWidth();
  }
  adjustGridBasedOnWidth() {
    const containerWidth = document.querySelector('.grid-container').clientWidth;
    const minCardWidth = 10; // Minimum card width before cards start to stack
    const cardCount = this.grid.length;
    const optimalWidth = containerWidth / cardCount;

    // Dynamically adjust the min-card-width based on the number of cards and the container width
    document.documentElement.style.setProperty('--min-card-width', `${Math.max(minCardWidth, optimalWidth)}px`);
  }
  initializeGrid() {
    if (this.cards.length > 0) {
      this.grid = [...this.cards]; // Assuming cards array is structured appropriately
    } else {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          let name = `${String.fromCharCode(65 + row)}${col + 1}`
          this.grid.push(new Card(row+col,0,SuitEnum.OTHER,name));
        }
      }
    }
  }
  selectPosition(position) {
    position.isSelected = !position.isSelected;
  }
}
