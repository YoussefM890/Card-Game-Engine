import {Component, Input} from '@angular/core';
import {triggers} from "../../models/constants/triggers";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {ParameterComponent} from "../parameter/parameter.component";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Trigger} from "../../models/classes/trigger";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

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
export class TriggerComponent {
  @Input() triggerForm: FormGroup;
  triggers: Trigger[] = triggers;

  constructor(private fb: FormBuilder) {
  }

  get parameters(): FormArray {
    return this.triggerForm.get('parameters') as FormArray;
  }

  updateTriggerParameters() {
    return triggers.find(t => t.id === this.triggerForm.get('id').value).parameters;
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addParameter() {
    const parameterForm = this.fb.group({
      id: [null, Validators.required],
      value: [null, Validators.required]
    });
    this.parameters.push(parameterForm);
  }

  removeParameter(index: number) {
    this.parameters.removeAt(index);
  }

}
