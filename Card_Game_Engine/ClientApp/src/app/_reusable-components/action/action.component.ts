import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ParameterComponent} from "../parameter/parameter.component";
import {MatIcon} from "@angular/material/icon";
import {clearFormArray, ListToObject} from "../../shared/functions/global";
import {Action} from "./namespace/classes/action";
import {Parameter} from "../parameter/namespace/classes/parameter";
import {ActionParameterEnum} from "../parameter/namespace/enums/parameter.enums";
import {getAvailableParameters} from "../_namespace/functions";
import {ActionService} from "./namespace/action.service";

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ParameterComponent,
    MatIcon,
  ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent implements OnInit {
  @Input() actionForm: FormGroup;
  actions: Action[];
  actionsObject: { [key: string]: Action };
  parameters: Parameter[][];

  constructor(private fb: FormBuilder, private actionService: ActionService) {
  }

  get parametersArray() {
    return this.actionForm.get('parameters') as FormArray;
  }

  ngOnInit(): void {
    this.listenToActions()
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
      const availableParameters = this.actionsObject[this.actionForm.value.id]?.parameters;
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

  listenToActions() {
    this.actionService.actions$.subscribe(actions => {
      this.actions = actions;
      this.actionsObject = ListToObject(actions, 'id');
      this.updateParameters()
    });
  }

}
