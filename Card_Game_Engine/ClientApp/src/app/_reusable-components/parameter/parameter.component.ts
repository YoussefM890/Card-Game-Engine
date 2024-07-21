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
}

