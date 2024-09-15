import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {DOCUMENT, NgStyle} from "@angular/common";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatTooltip} from "@angular/material/tooltip";
import {play_game} from "./play-game.namespace";
import {GridItem} from "./namespace/classes/grid-item";
import {Game} from "./namespace/classes/game";
import {Action} from './namespace/classes/action';
import {ActionEnum} from "../_reusable-components/action/namespace/enums/action.enum";
import {VisibilityOptionEnum} from "../_reusable-components/parameter/namespace/enums/parameter-value-options.enums";
import {Parameter} from './namespace/classes/parameter';
import {ActionParameterEnum} from "../_reusable-components/parameter/namespace/enums/parameter.enums";
import {TriggerEnum} from "../_reusable-components/trigger/namespace/enums/trigger.enum";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {ManualTrigger} from "../create-game/namespace/classes/manual-trigger";
import {CssStyle} from "../shared/models/classes/css-style";
import {CssStyleEnum} from "../shared/models/enums/css-style.enum";
import {RoleEnum} from "../shared/models/enums/role.enum";
import {SignalRService} from "../shared/services/signalr.service";
import {MatGridList} from "@angular/material/grid-list";
import {UserInfo} from "../shared/models/classes/user-info";
import {NavComponent} from "../_reusable-components/nav/nav.component";
import {generateGridDimensionsFromHeight} from "../_reusable-components/grid/namespace/functions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-play-game',
  standalone: true,
  imports: [
    GridComponent,
    MatButton,
    RouterLink,
    RouterLinkActive,
    CdkDropList,
    CdkDrag,
    NgStyle,
    MatTooltip,
    MatChip,
    MatChipSet,
    MatGridList,
    NavComponent,
  ],
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.scss'
})
export class PlayGameComponent implements OnInit, OnDestroy {
  private userInfoSubscription: Subscription;
  game: Game;
  grid: GridItem[] = [];
  cols: number
  rows: number
  visibilityOptions = play_game.visibilityOptions;
  selectedVisibilityOption = null;
  selectedCellId: number = null;
  itemStyles = null;
  manualTriggers: ManualTrigger[] = [];
  userInfo: UserInfo;
  isPlayer1 = false;
  isPlayer2 = false;
  gridStyles = {};

  constructor(@Inject(DOCUMENT) private document: Document, private signalrService: SignalRService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.positionGrid();
  }

  ngOnInit(): void {
    this.listenToGameObject();
    this.listenToUserInfo();
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }

  listenToUserInfo() {
    this.userInfoSubscription = this.signalrService.userInfo$.subscribe(userInfo => {
      if (!userInfo) return;
      this.userInfo = userInfo;
      this.isPlayer1 = userInfo.role === RoleEnum.Player1;
      this.isPlayer2 = userInfo.role === RoleEnum.Player2;
    });
  }

  startGame() {
    console.log('Starting game');
    this.signalrService.invokeExplicitTrigger(TriggerEnum.GameStart);
  }

  positionGrid() {
    this.gridStyles = generateGridDimensionsFromHeight(this.cols, this.rows, 0.8, 1.25, 0.8, 0.05)
  }

  onCellClick(item: GridItem) {
    if (this.selectedCellId === item.id) {
      this.cycleVisibilityOption();
    } else {
      if (this.selectedCellId !== null && this.selectedVisibilityOption !== null) {
        this.moveCard(this.selectedCellId, item.id, this.selectedVisibilityOption);
      } else {
        this.selectFirstActiveOption();
        this.selectedCellId = item.id;
      }
    }
    this.updateItemStyles();
  }

  toggleOption(option: play_game.VisibilityOption) {
    option.disabled = !option.disabled;
    if (option.disabled && option === this.selectedVisibilityOption) {
      this.selectedVisibilityOption = null;
      this.selectedCellId = null;
    }
    this.updateItemStyles();
  }

  invokeTrigger(triggerId: number) {
    this.signalrService.invokeExplicitTrigger(triggerId);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.visibilityOptions, event.previousIndex, event.currentIndex);
  }

  private cycleVisibilityOption() {
    const activeOptions = this.visibilityOptions.filter(opt => !opt.disabled);
    const currentIndex = activeOptions.findIndex(opt => opt === this.selectedVisibilityOption);

    if (currentIndex === activeOptions.length - 1) {
      this.selectedVisibilityOption = null;
      this.selectedCellId = null;
    } else {
      this.selectedVisibilityOption = activeOptions[currentIndex + 1];
    }
    this.updateItemStyles();
  }

  private selectFirstActiveOption() {
    const firstActiveOption = this.visibilityOptions.find(opt => !opt.disabled);
    this.selectedVisibilityOption = firstActiveOption || null;
    this.updateItemStyles();
  }

  listenToGameObject() {
    this.signalrService.game$.subscribe((gameObject: Game) => {
      this.game = gameObject;
      this.grid = [...gameObject.grid];
      this.manualTriggers = gameObject.manualTriggers;
      if (this.cols != gameObject.width || this.rows != gameObject.height) {
        this.cols = gameObject.width;
        this.rows = gameObject.height;
        this.positionGrid();
      }
    });
  }

  private updateItemStyles() {
    this.itemStyles = {};
    if (this.selectedCellId !== null && this.selectedVisibilityOption !== null) {
      this.itemStyles[this.selectedCellId] = [
        new CssStyle(CssStyleEnum.BoxShadow, `0 0 10px 5px ${this.selectedVisibilityOption.background}`)
      ];
    }
  }

  private moveCard(fromPosition: number, toPosition: number, visibilityOption: play_game.VisibilityOption) {
    console.log(`Moving card ${fromPosition} to ${toPosition} with visibility ${visibilityOption.display}`);
    let trueVisibility: string = visibilityOption.value;
    if (visibilityOption.value === play_game.VisibilityEnum.Private) {
      this.signalrService.playerRole === RoleEnum.Player2
        ? trueVisibility = VisibilityOptionEnum.Player2
        : trueVisibility = VisibilityOptionEnum.Player1
    }
    const action = new Action(ActionEnum.MoveCard);
    action.addParameter(new Parameter(ActionParameterEnum.FromPositions, '' + fromPosition));
    action.addParameter(new Parameter(ActionParameterEnum.ToPosition, '' + toPosition));
    action.addParameter(new Parameter(ActionParameterEnum.Visibility, trueVisibility));
    this.signalrService.invokeExplicitAction(action);
    this.selectedVisibilityOption = null;
    this.selectedCellId = null;
    this.updateItemStyles();
  }
}
