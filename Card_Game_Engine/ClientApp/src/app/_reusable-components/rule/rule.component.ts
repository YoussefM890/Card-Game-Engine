import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActionComponent} from "../action/action.component";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ParameterComponent} from "../parameter/parameter.component";
import {TriggerComponent} from "../trigger/trigger.component";

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ActionComponent,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ParameterComponent,
    TriggerComponent
  ],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.scss'
})
export class RuleComponent implements OnInit {
  @Input() ruleForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get actions(): FormArray {
    return this.ruleForm.get('actions') as FormArray
  };

  get triggers(): FormArray {
    return this.ruleForm.get('triggers') as FormArray;
  }

  get rules(): FormArray {
    return this.ruleForm.get('rules') as FormArray;
  }

  ngOnInit(): void {
    // this.addTrigger()
    // this.addAction()
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addTrigger() {
    const triggerForm = this.fb.group({
      id: [null, Validators.required],
      parameters: this.fb.array([])
    });
    this.triggers.push(triggerForm);
  }

  addInnerRule() {
    const ruleForm = this.fb.group({
      triggers: this.fb.array([]),
      rules: this.fb.array([]),
      actions: this.fb.array([])
    });
    this.rules.push(ruleForm);
  }

  addAction() {
    const actionForm = this.fb.group({
      id: [null, Validators.required],
      parameters: this.fb.array([])
    });
    this.actions.push(actionForm);
  }

  removeTrigger(index: number) {
    this.triggers.removeAt(index);
  }

  removeInnerRule(index: number) {
    this.rules.removeAt(index);
  }

  removeAction(index: number) {
    this.actions.removeAt(index);
  }
}
