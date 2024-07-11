import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgClass, NgStyle} from "@angular/common";
import {CardLineComponent} from "../card-line/card-line.component";
import {CardDeckComponent} from "../card-deck/card-deck.component";
import {SignalRService} from "../../services/signalr.service";
import {GridDisplayMode} from "../../models/enums/gird-display-mode";
import {CdkDrag, CdkDragDrop, CdkDropList,} from "@angular/cdk/drag-drop";
import {GridTransferItem} from "../../models/classes/grid-transfer-item";
import {CssStyle} from "../../models/classes/css-style";

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    CardComponent,
    MatGridListModule,
    NgStyle,
    CardLineComponent,
    CardDeckComponent,
    CdkDropList,
    CdkDrag,
    NgClass,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent implements OnInit {
  GridDisplayMode = GridDisplayMode;
  @Input() rows: number = 7;
  @Input() cols: number = 12;
  @Input() displayCellIndex: boolean = false;
  @Input() list: string[] = null;
  @Input() grid: GridTransferItem[] = null;
  @Input() overlap: boolean = false;
  @Input() itemStyles: Record<number, CssStyle[]> = null;
  @Output() cellClick: EventEmitter<any> = new EventEmitter<any>();
  mode: GridDisplayMode = GridDisplayMode.DEFAULT;
  moveCardFrom: number = null;
  moveCardTo: number = null;
  previousIndex: number = null;
  gridDimensions: { width: number, height: number, offsetTop: number, offsetLeft: number } = {
    width: 0,
    height: 0,
    offsetTop: 0,
    offsetLeft: 0
  };

  constructor(private signalrService: SignalRService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initDisplayMode();
  }

  initDisplayMode() {
    if (this.grid !== null) {
      this.mode = GridDisplayMode.DECK;
      return;
    }
    if (this.list !== null) {
      this.mode = GridDisplayMode.TEXT;
      return;
    }
    this.list = Array(this.rows * this.cols).fill('');
    if (this.displayCellIndex) {
      this.mode = GridDisplayMode.INDEX;
    }
  }

  onCellClick(item: any) {
    this.cellClick.emit(item); // Emit the selected card data
  }

  onCardDropped(event: CdkDragDrop<GridTransferItem[]>) {
    console.log('Card dropped', event)
  }

  onDragEnded(index: number) {
    console.log('Card drag ended', index)
  }

  range(n: number): number[] {
    return [...Array(n).keys()];
  }

  getItemStyle(itemId: number): string {
    if (this.itemStyles && this.itemStyles[itemId]) {
      return this.itemStyles[itemId].map(style => `${style.style}: ${style.value}`).join('; ');
    }
    return '';
  }
}
