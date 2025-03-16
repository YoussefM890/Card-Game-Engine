import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Parameter} from "./namespace/classes/parameter";
import {ParameterValueTypeEnum} from "./namespace/enums/parameter-value-type.enum";
import {MatOptionModule} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {PositionsSelectorModalComponent} from "./positions-selector-modal/positions-selector-modal.component";
import {CsvToIntSet} from "../../shared/functions/global";
import {FilterModalComponent} from "./filter-modal/filter-modal.component";
import {FormulaBuilderModalComponent} from "./formula-builder-modal/formula-builder-modal.component";

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.scss',
})
export class ParameterComponent implements OnInit {
  protected readonly Array = Array;
  @Input() parameterForm: FormGroup;
  @Input() availableParameters: Parameter[] = [];
  @Output() parameterChange: EventEmitter<number> = new EventEmitter<number>();
  selectedParameter: Parameter;
  types = ParameterValueTypeEnum;

  constructor(private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.selectedParameter = this.availableParameters.find(p => p.id === this.parameterForm.value.id);
  }

  onParameterChange(paramId: number) {
    this.selectedParameter = this.availableParameters.find(p => p.id === paramId);
    this.valueControl.setValue(null);
    this.parameterChange.emit(paramId);
  }

  get valueControl() {
    return this.parameterForm.get('value');
  }

  openPositionsSelectorModal(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(PositionsSelectorModalComponent, {
      data: {
        positions: CsvToIntSet(this.valueControl.value ?? '')
      }
    }).afterClosed().subscribe((positionsString) => {
      this.valueControl.setValue(positionsString);
    });
  }

  openFilterSelectorModal(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(FilterModalComponent, {
      width: '1000px',
      height: '600px',
      data: {
        filterType: this.selectedParameter.args,
        filter: this.valueControl.value
      }
    }).afterClosed().subscribe((filter) => {
      console.log('filter back from modal:', filter)
      this.valueControl.setValue(filter);
    });
  }

  openFormulaBuilderModal(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(FormulaBuilderModalComponent, {
      width: '1300px',
      height: '800px',
      data: {
        formula: this.valueControl.value
      }
    }).afterClosed().subscribe((formula) => {
      console.log('formula back from modal:', formula)
      this.valueControl.setValue(formula);
    });
  }
}

