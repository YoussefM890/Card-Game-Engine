import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Action} from "../../models/classes/action";
import {ParameterComponent} from "../parameter/parameter.component";
import {actions} from "../../models/constants/actions";
import {Parameter} from "../../models/classes/parameter";
import {MatIcon} from "@angular/material/icon";

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
  actionParameters: Parameter[] = [];

  get parameters(): FormArray {
    return this.actionForm.get('parameters') as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  addParameter() {
    const parameterForm = this.fb.group({
      id: [null, Validators.required],
      value: [null, Validators.required]
    });
    this.parameters.push(parameterForm);
  }

  updateActionParameters() {
    return actions.find(t => t.id === this.actionForm.value.id).parameters;
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  removeParameter(index: number) {
    this.parameters.removeAt(index);
  }
}
