import {Component, OnInit} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
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
import {CreateGame} from "../models/classes/create-game";
import {RuleComponent} from "../_reusable-components/rule/rule.component";
import {filterDictBySize, getEnumValues} from '../shared/functions/global';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {create_game} from "./create-game.namespace";
import {CssStyle} from "../models/classes/css-style";
import {CssStyleEnum} from "../models/enums/css-style.enum";

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
    RuleComponent,
    FormsModule,
    MatMiniFabButton,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit {
  gameForm: FormGroup;
  triggers: Trigger[] = triggers;
  width = 12;
  height = 7;
  visibilityOptions = create_game.visibilityOptions;
  selectedVisibilityOption = this.visibilityOptions[0];
  grid: Record<number, create_game.GridItem> = {};
  itemStyles: Record<number, CssStyle[]> = {};


  get rules(): FormArray {
    return this.gameForm.get('rules') as FormArray;
  }

  //region define the default deck
  selectedCards: Card[] = [];

  ngOnInit() {
    this.createGameForm()
    this.createSuitsForm()
  }

  createGameForm() {
    this.gameForm = this.fb.group({
      rules: this.fb.array([]),
    });
  }

  importRules() {
    this.dialog.open(ImportRulesComponent, {
      width: '600px',
      height: '700px',
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.gameForm = result;
      }
    });
  }

  addRule() {
    const ruleForm = this.fb.group({
      triggers: this.fb.array([]),
      actions: this.fb.array([]),
      rules: this.fb.array([])
    });
    this.rules.push(ruleForm);
  }

  removeRule(index: number) {
    this.rules.removeAt(index);
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

  onSubmit() {
    console.log(JSON.stringify(this.gameForm.value, null, 2));
    console.log(this.gameForm.value.rules);

    const createGameObject = new CreateGame(
      this.gameForm.value.rules,
      this.width,
      this.height,
      this.selectedCards,
      filterDictBySize<number, create_game.GridItem>(this.grid, this.width * this.height),
    );
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

  onValueSelected(value: string | number) {
    let currentCard: Card
    if (value === CardNameEnum.JOKER) {
      this.selectedCards.push(new Card(1, distinctCardsNameObject[value].value, SuitEnum.OTHER, 'Joker'));
    } else {
      this.suitsFormArray.value.forEach((selected: boolean, index: number) => {
        if (selected) {
          this.selectedCards.push(new Card(1, distinctCardsNameObject[value].value, this.suits[index].value as SuitEnum, value as string));
        }
      });
    }
    this.selectedCards = [...this.selectedCards];
  }

  onCardSelectedFromLine(card: Card) {
    this.selectedCards = this.selectedCards.filter(c => c !== card);
    this.selectedCards = [...this.selectedCards];
  }

  changeWidth(delta: number) {
    this.width += delta;
  }

  changeHeight(delta: number) {
    this.height += delta;
  }

  changeCellVisibility(index: number) {
    if (this.grid.hasOwnProperty(index)) {
      const currentVisibility = this.grid[index].visibility;
      if (currentVisibility === this.selectedVisibilityOption.value) {
        delete this.grid[index];
        delete this.itemStyles[index];
      } else {
        this.grid[index].visibility = this.selectedVisibilityOption.value;
        this.itemStyles[index] = this.getStyles(this.selectedVisibilityOption);
      }
    } else {
      this.grid[index] = {id: index, visibility: this.selectedVisibilityOption.value};
      this.itemStyles[index] = this.getStyles(this.selectedVisibilityOption);
    }
  }

  getStyles(selectedVisibilityOption: create_game.VisibilityOption) {
    return [
      new CssStyle(CssStyleEnum.BoxShadow, `0 0 10px ${selectedVisibilityOption.color}`),
      new CssStyle(CssStyleEnum.BackgroundColor, selectedVisibilityOption.background)
    ];
  }

}
