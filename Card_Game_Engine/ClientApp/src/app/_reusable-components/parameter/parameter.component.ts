import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {Parameter} from "./namespace/classes/parameter";
import {ParameterValueTypeEnum} from "./namespace/enums/parameter-value-type.enum";

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatIconButton,
    MatLabel,
    MatIcon,
    MatTooltip
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

  constructor() {
  }

  get valueControl() {
    return this.parameterForm.get('value');
  }

  ngOnInit(): void {
    this.selectedParameter = this.availableParameters.find(p => p.id === this.parameterForm.value.id);
  }

  onParameterChange(paramId: number) {
    this.selectedParameter = this.availableParameters.find(p => p.id === paramId);
    this.valueControl.setValue(null);
    this.parameterChange.emit(paramId);
  }
}

