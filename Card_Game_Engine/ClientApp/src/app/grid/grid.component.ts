import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Output() cardSelected : EventEmitter<Card> = new EventEmitter<Card>();
  grid = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeGrid();
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
  selectCard(card: Card) {
    this.cardSelected.emit(card); // Emit the selected card data
  }
}
