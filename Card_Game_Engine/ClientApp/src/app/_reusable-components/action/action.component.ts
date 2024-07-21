import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ParameterComponent} from "../parameter/parameter.component";
import {MatIcon} from "@angular/material/icon";
import {clearFormArray} from "../../shared/functions/global";
import {Action} from "./namespace/classes/action";
import {actions, actionsObject} from "./namespace/constants/actions";
import {Parameter} from "../parameter/namespace/classes/parameter";
import {ActionParameterEnum} from "../parameter/namespace/enums/parameter.enums";
import {getAvailableParameters} from "../_namespace/functions";

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    MatButton,
    ParameterComponent,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent implements OnInit {
  @Input() actionForm: FormGroup;
  actions: Action[] = actions;
  parameters: Parameter[][];

  constructor(private fb: FormBuilder) {
  }

  get parametersArray() {
    return this.actionForm.get('parameters') as FormArray;
  }

  ngOnInit(): void {
    this.updateParameters()
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addParameter() {
    const parameterForm = this.fb.group({
      id: [null, Validators.required],
      value: ['', Validators.required]
    });
    this.parametersArray.push(parameterForm);
    this.updateParameters();
  }

  updateParameters() {
    this.parameters = []
    let usedParameters = new Set<ActionParameterEnum>()
    for (let i = 0; i < this.parametersArray.length; i++) {
      const availableParameters = actionsObject[this.actionForm.value.id]?.parameters;
      this.parameters.push(getAvailableParameters(availableParameters, usedParameters));
      const parameterId = this.parametersArray.at(i).value.id;
      if (parameterId != null) usedParameters.add(parameterId);
    }
  }

  removeParameter(index: number) {
    this.parametersArray.removeAt(index);
    this.updateParameters();
  }

  onActionChange() {
    clearFormArray(this.parametersArray);
    this.updateParameters();
  }

}
