import {Component, Input, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {ParameterComponent} from "../parameter/parameter.component";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Trigger} from "./namespace/classes/trigger";
import {Parameter} from "../parameter/namespace/classes/parameter";
import {TriggerParameterEnum} from "../parameter/namespace/enums/parameter.enums";
import {getAvailableParameters} from "../_namespace/functions";
import {clearFormArray, ListToObject} from "../../shared/functions/global";
import {TriggerService} from "./namespace/trigger.service";

@Component({
  selector: 'app-trigger',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    ParameterComponent,
    ReactiveFormsModule,
    MatOption,
    MatButton,
    MatLabel,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './trigger.component.html',
  styleUrl: './trigger.component.scss'
})
export class TriggerComponent implements OnInit {
  @Input() triggerForm: FormGroup;
  triggers: Trigger[];
  triggersObject: any;
  parameters: Parameter[][]

  constructor(private fb: FormBuilder, private triggerService: TriggerService) {
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  get parametersArray(): FormArray {
    return this.triggerForm.get('parameters') as FormArray;
  }

  ngOnInit(): void {
    this.listenToTriggers()
    this.updateParameters()
  }

  addParameter() {
    const parameterForm = this.fb.group({
      id: [null, Validators.required],
      value: ['', Validators.required]
    });
    this.parametersArray.push(parameterForm);
    this.updateParameters();
  }

  listenToTriggers() {
    this.triggerService.triggers$.subscribe(triggers => {
      this.triggers = triggers;
      this.triggersObject = ListToObject(triggers, 'id');
      this.updateParameters()
    });
  }

  removeParameter(index: number) {
    this.parametersArray.removeAt(index);
    this.updateParameters();
  }

  onTriggerChange() {
    clearFormArray(this.parametersArray);
    this.updateParameters();
  }

  updateParameters() {
    this.parameters = []
    let usedParameters = new Set<TriggerParameterEnum>()
    for (let i = 0; i < this.parametersArray.length; i++) {
      const availableParameters = this.triggersObject[this.triggerForm.value.id]?.parameters;
      this.parameters.push(getAvailableParameters(availableParameters, usedParameters));
      const parameterId = this.parametersArray.at(i).value.id;
      if (parameterId != null) usedParameters.add(parameterId);
    }
  }
}
