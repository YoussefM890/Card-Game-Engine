import {Component, OnInit} from '@angular/core';
import {GridComponent} from "../grid/grid.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton} from "@angular/material/button";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {actions} from "../models/constants/actions";
import {triggers} from "../models/constants/triggers";
import {Trigger} from "../models/classes/trigger";
import {Action} from "../models/classes/action";
import {parameters} from "../models/constants/parameters";


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
    ReactiveFormsModule
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit {
  gameRuleForm: FormGroup;
  actions : Action[]  = actions;
  triggers:Trigger[] = triggers;
  get rules(): FormArray {
    return this.gameRuleForm.get('rules') as FormArray;
  }

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    console.log("init")
    console.log("actions", this.actions);
    console.log("triggers", this.triggers);
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
      name: ['', Validators.required],
      parameters: this.fb.array([])
    });
    this.getActions(ruleIndex).push(actionForm);
  }

  addParameter(actionIndex: number, ruleIndex: number) {
    const parameterForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
    this.getParameters(ruleIndex, actionIndex).push(parameterForm);
  }

  removeRule(index: number) {
    this.rules.removeAt(index);
  }

  removeAction(ruleIndex: number, actionIndex: number) {
    this.getActions(ruleIndex).removeAt(actionIndex);
  }

  removeParameter(ruleIndex: number, actionIndex: number, parameterIndex: number) {
    this.getParameters(ruleIndex, actionIndex).removeAt(parameterIndex);
  }
  getActions(ruleIndex: number): FormArray {
    return (this.rules.at(ruleIndex) as FormGroup).get('actions') as FormArray;
  }

  getParameters(ruleIndex: number, actionIndex: number): FormArray {
    return ((this.rules.at(ruleIndex) as FormGroup).get('actions') as FormArray).at(actionIndex).get('parameters') as FormArray;
  }
  getActionParameters(actionName : string){
    return this.actions.find(action => action.name === actionName).parameters;
  }

  onSubmit() {
    console.log(this.gameRuleForm.value);
    // Here you can handle the form submission, such as sending the data to your backend server
  }
}
