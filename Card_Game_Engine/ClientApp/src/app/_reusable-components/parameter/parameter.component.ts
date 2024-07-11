import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Parameter} from "../../models/classes/parameter";
import {ParameterValueTypeEnum} from "../../models/enums/parameter-value-type.enum";
import {MatTooltip} from "@angular/material/tooltip";

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
  styleUrl: './parameter.component.scss'
})
export class ParameterComponent implements OnInit {
  @Input() parameterForm: FormGroup;
  @Input() availableParameters: Parameter[] = [];
  selectedParameter: Parameter;
  types = ParameterValueTypeEnum;

  constructor() {
  }

  get valueControl() {
    return this.parameterForm.get('value');
  }

  ngOnInit(): void {
    this.selectedParameter = this.availableParameters.find(p => p.id === this.parameterForm.value.id);
    console.log(this.availableParameters);
  }

  onParameterChange(paramId: number) {
    this.selectedParameter = this.availableParameters.find(p => p.id === paramId);
    this.valueControl.setValue(null);
  }
}

