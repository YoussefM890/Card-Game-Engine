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
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {ActionComponent} from "../_reusable-components/action/action.component";
import {ParameterComponent} from "../_reusable-components/parameter/parameter.component";
import {SignalRService} from "../services/signalr.service";
import {ImportRulesComponent} from "./import-rules/import-rules.component";
import {MatDialog} from "@angular/material/dialog";
import {MatCheckbox} from "@angular/material/checkbox";
import {CardComponent} from "../_reusable-components/card/card.component";
import {CardLineComponent} from "../_reusable-components/card-line/card-line.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {RuleComponent} from "../_reusable-components/rule/rule.component";
import {copyToClipboard, filterDictBySize, getEnumValues, recreateFormArray} from '../shared/functions/global';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {CardNameEnum} from "../_reusable-components/card/namespace/enums/card-name.enum";
import {SuitEnum, suitsList} from "./namespace/enums/suit.enum";
import {Card as CreateGameCard} from "./namespace/classes/card";
import {visibilityOptions} from './namespace/constants/visibility-options';
import {
  distinctCardsNameObject,
  distinctCardsValueObject
} from "../_reusable-components/card/namespace/constants/distinct-cards";
import {GridItem} from "./namespace/classes/grid-item";
import {Card as GlobalCard} from "../_reusable-components/card/namespace/classes/card";
import {VisibilityOption} from "./namespace/classes/visibility-option";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {ManualTrigger} from "./namespace/classes/manual-trigger";
import {AddEditManualTriggerComponent} from "./add-edit-manual-trigger/add-edit-manual-trigger.component";
import {NgStyle} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {CssStyle} from "../shared/models/classes/css-style";
import {CssStyleEnum} from "../shared/models/enums/css-style.enum";

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
    MatChip,
    MatChipSet,
    NgStyle,
    MatTooltip,
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit {
  gameForm: FormGroup;
  visibilityOptions = visibilityOptions;
  selectedVisibilityOption = this.visibilityOptions[0];
  itemStyles: Record<number, CssStyle[]> = {};
  suitsForm: FormGroup;
  suits = suitsList.slice(0, 4);
  distinctCardsValues = getEnumValues(CardNameEnum);
  selectedCards: GlobalCard[] = [];

  constructor(private fb: FormBuilder,
              private signalrService: SignalRService,
              private dialog: MatDialog,
              private router: Router,
  ) {
    this.gameForm = this.signalrService.createGameForm;
  }

  get rules(): FormArray {
    return this.gameForm.get('rules') as FormArray;
  }

  //region define the default deck


  ngOnInit() {
    this.createSuitsForm()
    this.fillDisplay(this.gameForm);
    console.log(this.gameForm.value);
  }

  importRules() {
    this.dialog.open(ImportRulesComponent, {
      width: '600px',
      height: '700px',
    }).afterClosed().subscribe(() => {
      this.fillDisplay(this.gameForm)
    });
  }

  get manualTriggersArray() {
    return this.gameForm.get('manualTriggers') as FormArray;
  }

  fillDisplay(form: FormGroup) {
    this.fillSelectedCards(form.value.startingDeck);
    this.fillGridStyles(form.value.grid);
  }

  fillSelectedCards(startingDeck: GlobalCard[]) {
    this.selectedCards = startingDeck.map(card => {
      const viewCard = {...distinctCardsValueObject[card.value]}
      viewCard.suit = card.suit;
      return viewCard;
    });
  }

  fillGridStyles(grid: Record<number, GridItem>) {
    this.itemStyles = Object.keys(grid).reduce((acc, key) => {
      const visibilityOption = this.visibilityOptions.find(option => option.value === grid[key].visibility);
      acc[key] = this.getStyles(visibilityOption);
      return acc;
    }, {} as Record<number, CssStyle[]>);
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


  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  onSubmit() {
    const formAsString = JSON.stringify(this.gameForm.value, null, 2);
    copyToClipboard(formAsString)
    console.log(this.gameForm.value.rules);
    const form = this.gameForm.value;
    form.grid = filterDictBySize<number, GridItem>(form.grid, form.width * form.height);
    this.signalrService.createGame(form);
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
    let currentCard: GlobalCard
    if (value === CardNameEnum.JOKER) {
      this.selectedCards.push(new GlobalCard(1, distinctCardsNameObject[value].value, SuitEnum.OTHER, 'Joker'));
      this.startingDeckArray.push(this.fb.control(new CreateGameCard(distinctCardsNameObject[value].value, SuitEnum.OTHER)));
    } else {
      this.suitsFormArray.value.forEach((selected: boolean, index: number) => {
        if (selected) {
          this.selectedCards.push(new GlobalCard(1, distinctCardsNameObject[value].value, this.suits[index].value as SuitEnum, value as string));
          this.startingDeckArray.push(this.fb.control(new CreateGameCard(distinctCardsNameObject[value].value, this.suits[index].value as SuitEnum)));
        }
      });
    }
    //to trigger the @input to change
    this.selectedCards = [...this.selectedCards];
  }

  onCardSelectedFromLine(card: GlobalCard) {
    const selectedCardIndex = this.selectedCards.findIndex(c => c === card);
    if (selectedCardIndex >= 0) {
      this.selectedCards = [...this.selectedCards.slice(0, selectedCardIndex), ...this.selectedCards.slice(selectedCardIndex + 1)];
      this.startingDeckArray.removeAt(selectedCardIndex);
    } else {
      console.log("Card not found in the selected cards:", card);
    }
  }


  changeWidth(delta: number) {
    this.widthControl.setValue(this.widthControl.value + delta);
  }

  changeHeight(delta: number) {
    this.heightControl.setValue(this.heightControl.value + delta);
  }

  changeCellVisibility(index: number) {
    const grid = this.gameForm.get('grid').value;
    if (grid.hasOwnProperty(index)) {
      const currentVisibility = grid[index].visibility;
      if (currentVisibility === this.selectedVisibilityOption.value) {
        delete grid[index];
        delete this.itemStyles[index];
      } else {
        grid[index].visibility = this.selectedVisibilityOption.value;
        this.itemStyles[index] = this.getStyles(this.selectedVisibilityOption);
      }
    } else {
      grid[index] = {id: index, visibility: this.selectedVisibilityOption.value};
      this.itemStyles[index] = this.getStyles(this.selectedVisibilityOption);
    }
  }

  getStyles(selectedVisibilityOption: VisibilityOption) {
    return [
      new CssStyle(CssStyleEnum.BoxShadow, `0 0 10px ${selectedVisibilityOption.color}`),
      new CssStyle(CssStyleEnum.BackgroundColor, selectedVisibilityOption.background)
    ];
  }

  addManualTrigger() {
    this.dialog.open(AddEditManualTriggerComponent, {
      width: '1000px',
      height: '700px',
      data: {
        manualTriggers: this.manualTriggersArray.value
      }
    }).afterClosed().subscribe((newButtons) => {
      if (newButtons) {
        console.log("new button", newButtons)
        recreateFormArray(this.manualTriggersArray, newButtons);
      }
      console.log(this.gameForm.value)
    });
  }


  get widthControl() {
    return this.gameForm.get('width');
  }

  get heightControl() {
    return this.gameForm.get('height');
  }

  get startingDeckArray() {
    return this.gameForm.get('startingDeck') as FormArray;
  }

  getManualTriggerStyles(trigger: ManualTrigger) {
    const option = this.visibilityOptions.find(option => option.value === trigger.visibility);
    return {
      [CssStyleEnum.BackgroundColor]: option.background,
      //this color is not applying idk why
      [CssStyleEnum.Color]: option.color
    };
  }
}
