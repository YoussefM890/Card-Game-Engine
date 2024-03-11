import {Component, OnInit} from '@angular/core';
import {GridComponent} from "../grid/grid.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {triggers} from "../models/constants/triggers";
import {Trigger} from "../models/classes/trigger";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ActionComponent} from "../_reusable-components/action/action.component";
import {ParameterComponent} from "../_reusable-components/parameter/parameter.component";


@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [
    GridComponent,
    MatGridList,
    MatGridTile,
    MatButton,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatInput,
    ActionComponent,
    ParameterComponent
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit {
  gameRuleForm: FormGroup;
  triggers:Trigger[] = triggers;
  get rules(): FormArray {
    return this.gameRuleForm.get('rules') as FormArray;
  }
  constructor(private fb: FormBuilder) {
  }
  ngOnInit() {
    this.gameRuleForm = this.fb.group({
      rules: this.fb.array([])
    });
  }
  addRule() {
    const ruleForm = this.fb.group({
      trigger: ['', Validators.required],
      actions: this.fb.array([])
    });
    this.rules.push(ruleForm);
  }
  addAction(ruleIndex: number) {
    const actionForm = this.fb.group({
      id: [null, Validators.required],
      parameters: this.fb.array([])
    });
    this.getActions(ruleIndex).push(actionForm);
  }

  getActions(ruleIndex: number): FormArray {
    return (this.rules.at(ruleIndex) as FormGroup).get('actions') as FormArray;
  }

  onSubmit() {
    console.log(this.gameRuleForm.value);
    // Here you can handle the form submission, such as sending the data to your backend server
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
