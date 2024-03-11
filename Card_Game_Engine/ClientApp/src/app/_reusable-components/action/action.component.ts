import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {Action} from "../../models/classes/action";
import {ParameterComponent} from "../parameter/parameter.component";
import {actions} from "../../models/constants/actions";

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
    ParameterComponent
  ],
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent implements OnInit {
  @Input() ruleForm: FormGroup;
  @Input() actionForm: FormGroup;
  @Input() actionIndex: number;
  actions: Action[] = actions;

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
    (this.actionForm.get('parameters') as FormArray).push(parameterForm);
  }

  removeAction() {
    (this.ruleForm.get('actions') as FormArray).removeAt(this.actionIndex);
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
