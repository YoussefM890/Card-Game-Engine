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
import {SignalRService} from "../services/signalr.service";
import {Parameter} from "../models/classes/parameter";
import {ImportRulesComponent} from "./import-rules/import-rules.component";
import {MatDialog} from "@angular/material/dialog";
import {AllDistinctCards} from "../models/constants/cards";
import {MatCheckbox} from "@angular/material/checkbox";
import {SuitEnum} from "../models/enums/suit.enum";
import {enumToList} from "../models/functions";
import {CardComponent} from "../card/card.component";
import {CardLineComponent} from "../_reusable-components/card-line/card-line.component";


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
    ParameterComponent,
    MatCheckbox,
    CardComponent,
    CardLineComponent,
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit {
  gameRuleForm: FormGroup;
  triggers:Trigger[] = triggers;
  triggerParameters: Parameter[] = [];

  get rules(): FormArray {
    return this.gameRuleForm.get('rules') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private signalrService: SignalRService,
              private dialog: MatDialog,
  ) {
  }
  ngOnInit() {
    this.gameRuleForm = this.fb.group({
      rules: this.fb.array([])
    });
  }

  importRules() {
    this.dialog.open(ImportRulesComponent, {
      width: '600px',
      height: '700px',
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.gameRuleForm = result;
      }
    });
  }
  addRule() {
    const ruleForm = this.fb.group({
      trigger: ['', Validators.required],
      actions: this.fb.array([]),
      parameters: this.fb.array([])
    });
    this.rules.push(ruleForm);
  }

  addParameter(ruleIndex: number) {
    const parameterForm = this.fb.group({
      id: [null, Validators.required],
      value: [null, Validators.required]
    });
    ((this.gameRuleForm.get('rules') as FormArray).at(ruleIndex).get('parameters') as FormArray).push(parameterForm);
  }
  addAction(ruleIndex: number) {
    const actionForm = this.fb.group({
      id: [null, Validators.required],
      parameters: this.fb.array([])
    });
    this.getActions(ruleIndex).push(actionForm);
  }

  removeRule(index: number) {
    this.rules.removeAt(index);
  }

  getParameters(ruleIndex: number): FormArray {
    return (this.rules.at(ruleIndex) as FormGroup).get('parameters') as FormArray;
  }
  getActions(ruleIndex: number): FormArray {
    return (this.rules.at(ruleIndex) as FormGroup).get('actions') as FormArray;
  }

  updateTriggerParameters(rule: AbstractControl) {
    this.triggerParameters = triggers.find(t => t.id === rule.get('trigger').value).parameters;
  }

  onSubmit() {
    console.log(JSON.stringify(this.gameRuleForm.value, null, 2));
    console.log(this.gameRuleForm.value.rules);
    this.signalrService.ProcessRules(this.gameRuleForm.value);
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  //region define the default deck
  selectedCards = [1,2,3,4,5,6,7,8,9,10];
  distinctCards = AllDistinctCards;
  suits = enumToList(SuitEnum).slice(0,4);


}
