import {Component, OnInit} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
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
import {MatCheckbox} from "@angular/material/checkbox";
import {SuitEnum, suitsList} from "../models/enums/suit.enum";
import {CardComponent} from "../_reusable-components/card/card.component";
import {CardLineComponent} from "../_reusable-components/card-line/card-line.component";
import {Card} from "../models/classes/card";
import {distinctCardsNameObject} from "../models/constants/cards";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CardNameEnum} from "../models/enums/card-name.enum";
import {getEnumValues} from "../models/functions";
import {CreateGame} from "../models/classes/create-game";

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
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit {
  gameRuleForm: FormGroup;
  triggers: Trigger[] = triggers;
  triggerParameters: Parameter[] = [];

  get rules(): FormArray {
    return this.gameRuleForm.get('rules') as FormArray;
  }
  //region define the default deck
  selectedCards: Card[] = [];

  ngOnInit() {
    this.gameRuleForm = this.fb.group({
      rules: this.fb.array([])
    });
    this.createSuitsForm()
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
  suits = suitsList.slice(0, 4);

  distinctCardsValues = getEnumValues(CardNameEnum);

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  suitsForm: FormGroup;

  constructor(private fb: FormBuilder,
              private signalrService: SignalRService,
              private dialog: MatDialog,
              private router: Router,
  ) {
  }

  updateTriggerParameters(rule: AbstractControl) {
    return triggers.find(t => t.id === rule.get('trigger').value).parameters;
  }

  onSubmit() {
    console.log(JSON.stringify(this.gameRuleForm.value, null, 2));
    console.log(this.gameRuleForm.value.rules);
    const createGameObject = new CreateGame(this.gameRuleForm.value.rules, this.selectedCards);
    this.signalrService.createGame(createGameObject);
    this.router.navigate(['/play-game']);
  }

  get suitsFormArray() {
    return this.suitsForm.get('suits') as FormArray;
  }

  createSuitsForm() {
    this.suitsForm = this.fb.group({
      suits: this.fb.array(this.suits.map(() => new FormControl(true)))
    });
    console.log(this.suitsForm.value);
  }

  onValueSelected(value: string) {
    let currentCard: Card
    if (value === CardNameEnum.JOKER) {
      this.selectedCards.push(new Card(1, distinctCardsNameObject[value].value, SuitEnum.OTHER, 'Joker'));
    } else {
      this.suitsFormArray.value.forEach((selected: boolean, index: number) => {
        if (selected) {
          this.selectedCards.push(new Card(1, distinctCardsNameObject[value].value, this.suits[index].value as SuitEnum, value));
        }
      });
    }
    this.selectedCards = [...this.selectedCards];
  }

  onCardSelectedFromLine(card: Card) {
    this.selectedCards = this.selectedCards.filter(c => c !== card);
    this.selectedCards = [...this.selectedCards];
  }
}
