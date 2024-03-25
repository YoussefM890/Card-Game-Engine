import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgStyle} from "@angular/common";
import {GridItem} from "../../models/classes/grid-item";
import {CardLineComponent} from "../card-line/card-line.component";
import {CardDeckComponent} from "../card-deck/card-deck.component";
import {SignalRService} from "../../services/signalr.service";
import {GridDisplayMode} from "../../models/enums/gird-display-mode";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CardComponent,
    MatGridListModule,
    NgStyle,
    CardLineComponent,
    CardDeckComponent,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit {
  GridDisplayMode = GridDisplayMode;
  @Input() rows: number = 7;
  @Input() cols: number = 12;
  @Input() displayCellIndex: boolean = false;
  @Input() values: string[] = null;
  @Input() grid: GridItem[] = null;
  @Input() overlap: boolean = false;
  @Output() cardSelected: EventEmitter<string> = new EventEmitter<string>();
  mode: GridDisplayMode = GridDisplayMode.DEFAULT;

  constructor(private signalrService: SignalRService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initDisplayMode();
  }

  // setupGameListener() {
  //   this.signalrService.game$.subscribe(game => {
  //     this._grid = [... game.grid];
  //     console.log('Game updated from grid',game.grid)
  //   });
  // }
  initDisplayMode() {
    if (this.grid !== null) {
      this.mode = GridDisplayMode.DECK;
      return;
    }
    if (this.values !== null) {
      this.mode = GridDisplayMode.TEXT;
      return;
    }
    this.values = Array(this.rows * this.cols).fill('');
    if (this.displayCellIndex) {
      this.mode = GridDisplayMode.INDEX;
    }
  }

  // initializeGrid() {
  //   if (this.mode === GridDisplayMode.DEFAULT) {
  //     this.grid = [];
  //     for (let row = 0; row < this.rows; row++) {
  //       for (let col = 0; col < this.cols; col++) {
  //         let name = `${String.fromCharCode(65 + row)}${col + 1}`
  //         this.grid.push(new GridItem(row + col, []));
  //       }
  //     }
  //   }
  // }
  selectCell(value: string) {
    this.cardSelected.emit(value); // Emit the selected card data
  }
}
