import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
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
import {MatIcon} from "@angular/material/icon";
import {ImportRulesComponent} from "./import-rules/import-rules.component";
import {MatDialog} from "@angular/material/dialog";
import {MatCheckbox} from "@angular/material/checkbox";
import {CardLineComponent} from "../_reusable-components/card-line/card-line.component";
import {Router} from "@angular/router";
import {RuleComponent} from "../_reusable-components/rule/rule.component";
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {RuleDragDropService} from "../_reusable-components/rule/rule-drag-drop.service";
import {
  copyToClipboard,
  filterDictBySize,
  getEnumValues,
  JsonToForm,
  recreateFormArray
} from '../shared/functions/global';
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
import {CommonModule, NgStyle} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {CssStyle} from "../shared/models/classes/css-style";
import {CssStyleEnum} from "../shared/models/enums/css-style.enum";
import {UserInfo} from "../shared/models/classes/user-info";
import {SignalRService} from "../shared/services/signalr.service";
import {NavComponent} from "../_reusable-components/nav/nav.component";
import {Game} from "./namespace/classes/game";
import {EditPlayersComponent} from "./edit-players/edit-players.component";
import {perspectiveOptions} from "./namespace/constants/perspective-options";
import {Player} from "./namespace/classes/player";
import {PerspectiveOption} from "./namespace/classes/perspective-option";
import {playersColors} from "../shared/models/enums/color.enum";
import {VisibilityEnum} from "./namespace/enums/visibility.enum";

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [
    CommonModule,
    GridComponent,
    MatButton,
    MatIconButton,
    ReactiveFormsModule,
    MatIcon,
    MatCheckbox,
    CardLineComponent,
    RuleComponent,
    FormsModule,
    MatMiniFabButton,
    MatChip,
    MatChipSet,
    NgStyle,
    MatTooltip,
    NavComponent,
    DragDropModule,
  ],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.scss'
})
export class CreateGameComponent implements OnInit, AfterViewInit, OnDestroy {
  gameForm: FormGroup;
  visibilityOptions: VisibilityOption[] = visibilityOptions;
  perspectiveOptions: PerspectiveOption[] = perspectiveOptions
  selectedVisibilityOption: VisibilityOption = this.visibilityOptions[0];
  itemStyles: Record<number, CssStyle[]> = {};
  suitsForm: FormGroup;
  suits = suitsList.slice(0, 4);
  distinctCardsValues = getEnumValues(CardNameEnum);
  selectedCards: GlobalCard[] = [];
  userInfo: UserInfo
  showRoomId = false;
  players: Player[] = [];

  @ViewChild('topLevelRuleDropList') topLevelRuleDropList: CdkDropList;
  private cachedConnectedLists: CdkDropList[] = [];

  constructor(private fb: FormBuilder,
              private signalrService: SignalRService,
              private dialog: MatDialog,
              private router: Router,
              public dragDropService: RuleDragDropService,
              private cdr: ChangeDetectorRef,
  ) {
    this.gameForm = this.signalrService.createGameForm;
  }

  get playersArray() {
    return this.gameForm.get('players') as FormArray;
  }

  get rules(): FormArray {
    return this.gameForm.get('rules') as FormArray;
  }

  get startingDeckArray() {
    return this.gameForm.get('startingDeck') as FormArray;
  }

  listenToUserInfo() {
    this.signalrService.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
      this.showRoomId = userInfo?.isRoomOwner;
    });
  }

  importRules() {
    this.dialog.open(ImportRulesComponent, {
      width: '600px',
      height: '700px',
    }).afterClosed().subscribe(() => {
      this.fillSelectedCards(this.gameForm.value.startingDeck);
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

  listenToPlayers() {
    this.signalrService.Players$.subscribe(players => {
      console.log("players changed", players)
      this.players = players;
      const baseOptions = visibilityOptions.filter(
        option => option.value !== VisibilityEnum.Specific
      );

      const playerOptions = players.map((player, index) =>
        new VisibilityOption(
          player.id,
          player.role,
          playersColors[index].color,
          playersColors[index].background,
          `make the card visible to ${player.role}`
        )
      );
      this.visibilityOptions = [...baseOptions, ...playerOptions];
      this.selectedVisibilityOption = this.visibilityOptions[0];
      this.updateGridForm();
    });
  }

  ngOnInit() {
    this.listenToPlayers();
    this.createSuitsForm()
    this.fillDisplay(this.gameForm);
    this.listenToUserInfo();
    console.log(this.gameForm.value);
  }

  ngAfterViewInit(): void {
    if (this.topLevelRuleDropList) {
      this.dragDropService.registerRuleList(this.topLevelRuleDropList);
    }
    // Subscribe to list changes to update cached connected lists
    this.dragDropService.listsChanged$.subscribe(() => {
      this.updateConnectedLists();
      this.cdr.detectChanges();
    });
    // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.updateConnectedLists();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.topLevelRuleDropList) {
      this.dragDropService.unregisterRuleList(this.topLevelRuleDropList);
    }
  }

  onRuleDrop(event: CdkDragDrop<FormArray>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.controls,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data.at(event.previousIndex);
      event.previousContainer.data.removeAt(event.previousIndex);
      event.container.data.insert(event.currentIndex, item);
    }
    event.container.data.updateValueAndValidity();
    if (event.previousContainer !== event.container) {
      event.previousContainer.data.updateValueAndValidity();
    }
  }

  updateConnectedLists(): void {
    this.cachedConnectedLists = this.dragDropService.getRuleLists().filter(list => list !== this.topLevelRuleDropList);
  }

  getConnectedRuleLists(): CdkDropList[] {
    return this.cachedConnectedLists;
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

  duplicateRule(index: number) {
    const ruleToDuplicate = this.rules.at(index);
    const duplicatedRule = this.duplicateRuleRecursive(ruleToDuplicate.value);
    this.rules.insert(index + 1, duplicatedRule);
  }

  private duplicateRuleRecursive(ruleValue: any): FormGroup {
    return this.fb.group({
      triggers: this.fb.array(
        (ruleValue.triggers || []).map((trigger: any) =>
          this.fb.group({
            id: [trigger.id],
            parameters: this.fb.array(
              (trigger.parameters || []).map((param: any) =>
                this.fb.group({
                  id: [param.id],
                  value: [param.value]
                })
              )
            )
          })
        )
      ),
      rules: this.fb.array(
        (ruleValue.rules || []).map((rule: any) => this.duplicateRuleRecursive(rule))
      ),
      actions: this.fb.array(
        (ruleValue.actions || []).map((action: any) =>
          this.fb.group({
            id: [action.id],
            parameters: this.fb.array(
              (action.parameters || []).map((param: any) =>
                this.fb.group({
                  id: [param.id],
                  value: [param.value]
                })
              )
            )
          })
        )
      )
    });
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  fillGridStyles(grid: Record<number, GridItem>) {
    this.itemStyles = Object.keys(grid).reduce((acc, key) => {
      acc[key] = this.getStylesForGridItem(grid[key]);
      return acc;
    }, {} as Record<number, CssStyle[]>);
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

  updateGridForm() {
    console.log("players at updateGridForm", this.players);
    const currentGrid = this.gameForm.get("grid").value as Record<number, GridItem>;
    console.log("grid before", currentGrid);

    // Work with plain object
    for (let key in currentGrid) {
      const item = currentGrid[key];
      item.visibleTo = item.visibleTo.filter(id => this.players.some(p => p.id === id));

      if (item.visibleTo.length === 0 && item.visibility === VisibilityEnum.Specific) {
        item.visibility = VisibilityEnum.None;
      } else if (item.visibleTo.length === this.players.length && item.visibility === VisibilityEnum.Specific) {
        // item.visibility = VisibilityEnum.All;
        // item.visibleTo = [];
      }
    }

    console.log("grid after", currentGrid);

    // Convert back to FormGroup
    this.gameForm.setControl('grid', JsonToForm(currentGrid));
    this.fillGridStyles(currentGrid);
  }

  onSubmit() {
    const formAsString = JSON.stringify(this.gameForm.value, null, 2);
    copyToClipboard(formAsString)
    const form = this.gameForm.value as Game;
    form.grid = filterDictBySize<number, GridItem>(form.grid, form.width * form.height);
    this.signalrService.createGame(form);
    this.router.navigate(['/play']);
  }

  changeCellVisibility(index: number) {
    const grid = this.gameForm.get('grid').value as Record<number, GridItem>;
    const selected = this.selectedVisibilityOption;
    const isSpecific = selected.value < 0;

    // Use negative numeric IDs
    const allPlayerIds = this.players.map(p => p.id); // [-1, -2, -3, ...]

    let existing = grid[index];
    if (!existing) {
      existing = {
        id: index,
        visibility: isSpecific ? VisibilityEnum.Specific : selected.value,
        visibleTo: isSpecific ? [selected.value] : []
      };
    } else {
      if (selected.value === VisibilityEnum.All) {
        if (existing.visibility === VisibilityEnum.All) {
          delete grid[index];
          delete this.itemStyles[index];
          // Convert back to form
          this.gameForm.setControl('grid', JsonToForm(grid));
          return;
        }
        existing.visibility = VisibilityEnum.All;
        existing.visibleTo = [];

      } else if (selected.value === VisibilityEnum.None) {
        if (existing.visibility === VisibilityEnum.None) {
          delete grid[index];
          delete this.itemStyles[index];
          // Convert back to form
          this.gameForm.setControl('grid', JsonToForm(grid));
          return;
        }
        existing.visibility = VisibilityEnum.None;
        console.log("here");
        existing.visibleTo = [];
      } else if (isSpecific) {
        if (existing.visibility === VisibilityEnum.All) {
          existing.visibility = VisibilityEnum.Specific;
          existing.visibleTo = allPlayerIds.filter(id => id !== selected.value);
        } else if (existing.visibility === VisibilityEnum.None) {
          existing.visibility = VisibilityEnum.Specific;
          existing.visibleTo = [selected.value];
        } else { // Specific
          if (existing.visibleTo.includes(selected.value)) {
            existing.visibleTo = existing.visibleTo.filter(id => id !== selected.value);
          } else {
            existing.visibleTo.push(selected.value);
          }
        }
      }
    }

    // Grouping
    if (existing.visibility === VisibilityEnum.Specific) {
      if (existing.visibleTo.length === allPlayerIds.length) {
        // existing.visibility = VisibilityEnum.All;
        // existing.visibleTo = [];
      } else if (existing.visibleTo.length === 0) {
        existing.visibility = VisibilityEnum.None;
        existing.visibleTo = [];
      }
    }

    grid[index] = existing;
    this.itemStyles[index] = this.getStylesForGridItem(existing);

    // Convert the mutated grid back to a FormGroup
    this.gameForm.setControl('grid', JsonToForm(grid));
  }

  getStylesForGridItem(item: GridItem): CssStyle[] {
    const styles: CssStyle[] = [];

    if (item.visibility === VisibilityEnum.All) {
      const option = this.visibilityOptions.find(opt => opt.value === VisibilityEnum.All);
      if (option) {
        styles.push(new CssStyle(CssStyleEnum.Background, option.background));
        styles.push(new CssStyle(CssStyleEnum.BoxShadow, '0 0 5px 2px ' + option.color));
      }
    } else if (item.visibility === VisibilityEnum.None) {
      const option = this.visibilityOptions.find(opt => opt.value === VisibilityEnum.None);
      if (option) {
        styles.push(new CssStyle(CssStyleEnum.Background, option.background));
        styles.push(new CssStyle(CssStyleEnum.BoxShadow, '0 0 5px 2px ' + option.color));
      }
    } else if (item.visibility === VisibilityEnum.Specific) {
      const themes = item.visibleTo
        .map(playerId => {
          const opt = this.visibilityOptions.find(opt => opt.value === playerId);
          return opt ? {background: opt.background, color: opt.color} : null;
        })

      // console.log("updating grid display")
      if (themes.length === 1) {
        styles.push(new CssStyle(CssStyleEnum.Background, themes[0].background));
        styles.push(new CssStyle(CssStyleEnum.BoxShadow, '0 0 5px 2px ' + themes[0].color));
      } else if (themes.length > 1) {
        const sliceSize = 100 / themes.length;
        const segments = themes.map((theme, i) => {
          const start = (i * sliceSize).toFixed(2);
          const end = ((i + 1) * sliceSize).toFixed(2);
          return `${theme.background} ${start}% ${end}%`;
        });
        const gradient = `conic-gradient(${segments.join(', ')})`;
        styles.push(new CssStyle(CssStyleEnum.Background, gradient));
        styles.push(new CssStyle(CssStyleEnum.BoxShadow, '0 0 5px 2px ' + themes[0].color));
      }
    }
    // console.log("styles for grid item", item, styles)
    return styles;
  }

  addManualTrigger() {
    this.dialog.open(AddEditManualTriggerComponent, {
      width: '1000px',
      height: '700px',
      data: {
        manualTriggers: this.manualTriggersArray.value,
        players: this.playersArray.value
      }
    }).afterClosed().subscribe((newButtons) => {
      if (newButtons) {
        console.log("new button", newButtons)
        recreateFormArray(this.manualTriggersArray, newButtons);
      }
      console.log(this.gameForm.value)
    });
  }

  getManualTriggerStyles(trigger: ManualTrigger) {
    //TODO: fix this
    // const option = this.visibilityOptions.find(option => option.value === trigger.visibleTo);
    // return {
    //   [CssStyleEnum.BackgroundColor]: option.background,
    //   //this color is not applying idk why
    //   [CssStyleEnum.Color]: option.color
    // };
    return {
      [CssStyleEnum.BackgroundColor]: "#ff9800",
      [CssStyleEnum.Color]: "black"
    };
  }


  get widthControl() {
    return this.gameForm.get('width');
  }

  get heightControl() {
    return this.gameForm.get('height');
  }

  getPlayersStyles(trigger: Player) {
    const option = this.perspectiveOptions.find(option => option.value === trigger.perspective);
    return {
      [CssStyleEnum.BackgroundColor]: option.background,
      //this color is not applying idk why
      [CssStyleEnum.Color]: option.color
    };
  }

  openEditPlayers() {
    this.dialog.open(EditPlayersComponent, {
      width: '1000px',
      height: '700px',
      data: {
        players: this.playersArray.value
      }
    }).afterClosed().subscribe((newPlayers) => {
      if (newPlayers) {
        recreateFormArray(this.playersArray, newPlayers);
      }
      console.log(this.gameForm.value)
    });
  }

}
