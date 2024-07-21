import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from "../../../services/signalr.service";
import {GridComponent} from "../../grid/grid.component";
import {generateGridDimensions} from "../../grid/namespace/functions";
import {NgStyle} from "@angular/common";
import {ColorEnum} from "../../../shared/models/enums/color.enum";
import {CssStyle} from "../../../shared/models/classes/css-style";
import {CssStyleEnum} from "../../../shared/models/enums/css-style.enum";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {setToCsv} from "../../../shared/functions/global";

@Component({
  selector: 'app-positions-selector-modal',
  standalone: true,
  imports: [
    GridComponent,
    NgStyle
  ],
  templateUrl: './positions-selector-modal.component.html',
  styleUrl: './positions-selector-modal.component.scss'
})
export class PositionsSelectorModalComponent implements OnInit, OnDestroy {
  width: number;
  height: number
  gridStyles: object = {}
  selectedCells: Set<number> = new Set()
  itemStyles: Record<number, CssStyle[]> = {}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PositionsSelectorModalComponent>,
              private service: SignalRService) {
    this.width = service.createGameForm.value.width;
    this.height = service.createGameForm.value.height;
  }

  ngOnInit() {
    this.gridStyles = generateGridDimensions(this.height, this.width, 0.8)
    this.selectedCells = this.data.positions
    this.selectedCells.forEach(index => this.addStyle(index))
  }

  ngOnDestroy() {
    this.dialogRef.close(setToCsv(this.selectedCells))
  }

  onCellClicked(index: number) {
    if (this.selectedCells.has(index)) {
      this.selectedCells.delete(index)
      this.removeStyle(index)
    } else {
      this.selectedCells.add(index)
      this.addStyle(index)
    }
  }

  addStyle(index: number) {
    this.itemStyles[index] = [
      new CssStyle(CssStyleEnum.BackgroundColor, ColorEnum.Blue),
      new CssStyle(CssStyleEnum.BoxShadow, `0 0 10px ${ColorEnum.DarkBlue}`)
    ]
  }

  removeStyle(index: number) {
    delete this.itemStyles[index]
  }
}
