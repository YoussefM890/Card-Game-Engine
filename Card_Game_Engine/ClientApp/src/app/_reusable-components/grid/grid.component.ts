import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgClass, NgStyle} from "@angular/common";
import {GridItem} from "../../models/classes/grid-item";
import {CardLineComponent} from "../card-line/card-line.component";
import {CardDeckComponent} from "../card-deck/card-deck.component";
import {SignalRService} from "../../services/signalr.service";
import {GridDisplayMode} from "../../models/enums/gird-display-mode";
import {CdkDrag, CdkDragDrop, CdkDropList,} from "@angular/cdk/drag-drop";
import {ActionDTO} from "../../models/classes/action";
import {ActionEnum} from "../../models/enums/action.enum";
import {ParameterDTO} from "../../models/classes/parameter";
import {ParameterEnum} from "../../models/enums/parameter.enum";

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
  @Input() values: string[] = null;
  @Input() grid: GridItem[] = null;
  @Input() overlap: boolean = false;
  @Output() cellSelected: EventEmitter<string> = new EventEmitter<string>();
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
    if (this.values !== null) {
      this.mode = GridDisplayMode.TEXT;
      return;
    }
    this.values = Array(this.rows * this.cols).fill('');
    if (this.displayCellIndex) {
      this.mode = GridDisplayMode.INDEX;
    }
  }
  selectCell(value: string) {
    this.cellSelected.emit(value); // Emit the selected card data
  }

  moveCard(index: number) {
    if (this.moveCardFrom === null) {
      this.moveCardFrom = index;
      return;
    }
    if (this.moveCardFrom === index) {
      this.moveCardFrom = null;
      return;
    }
    this.moveCardTo = index;
    console.log('Move card from', this.moveCardFrom, 'to', this.moveCardTo)
    this._moveCard();
  }

  onCardDropped(event: CdkDragDrop<GridItem[]>) {
    console.log('Card dropped', event)
  }

  onDragEnded(index: number) {
    console.log('Card drag ended', index)
  }

  private _moveCard() {
    const action = new ActionDTO(ActionEnum.MoveCard);
    action.addParameter(new ParameterDTO(ParameterEnum.FromPosition, '' + this.moveCardFrom));
    action.addParameter(new ParameterDTO(ParameterEnum.ToPosition, '' + this.moveCardTo));
    this.signalrService.invokeExplicitAction(action);
    this.moveCardFrom = null;
    this.moveCardTo = null;
  }
}
