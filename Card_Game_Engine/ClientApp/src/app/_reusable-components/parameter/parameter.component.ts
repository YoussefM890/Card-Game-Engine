import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Parameter} from "../../models/classes/parameter";
import {parameters} from "../../models/constants/parameters";
import {Action} from "../../models/classes/action";
import {actions} from "../../models/constants/actions";

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
    MatIcon
  ],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.scss'
})
export class ParameterComponent implements OnInit {
  @Input() actionForm: FormGroup;
  @Input() parameterForm: FormGroup;
  @Input() parameterIndex: number;
  allParameters: Parameter[] = parameters;
  actions: Action[] = actions;
  parameters: Parameter[] = [];


  constructor() {
  }

  ngOnInit(): void {
    this.getParameters();
  }

  getParameters() {
    this.parameters = this.actions.find(a => a.id === this.actionForm.value.id)?.parameters ?? [];
    // return allPossibleParameters
    // return  allPossibleParameters.filter(possibleParam =>
    //   !action.parameters.some(existingParam => existingParam.id === possibleParam.id)
    // );
  }

  removeParameter() {
    (this.actionForm.get('parameters') as FormArray).removeAt(this.parameterIndex);
  }
}

