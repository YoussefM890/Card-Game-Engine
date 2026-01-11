import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
import {MatButton} from "@angular/material/button";
import {DOCUMENT, NgStyle} from "@angular/common";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatTooltip} from "@angular/material/tooltip";
import {play_game} from "./play-game.namespace";
import {GridItem} from "./namespace/classes/grid-item";
import {Game} from "./namespace/classes/game";
import {Action} from './namespace/classes/action';
import {ActionEnum} from "../_reusable-components/action/namespace/enums/action.enum";
import {Parameter} from './namespace/classes/parameter';
import {ActionParameterEnum} from "../_reusable-components/parameter/namespace/enums/parameter.enums";
import {TriggerEnum} from "../_reusable-components/trigger/namespace/enums/trigger.enum";
import {ManualTrigger} from "../create-game/namespace/classes/manual-trigger";
import {CssStyle} from "../shared/models/classes/css-style";
import {CssStyleEnum} from "../shared/models/enums/css-style.enum";
import {SignalRService} from "../shared/services/signalr.service";
import {UserInfo} from "../shared/models/classes/user-info";
import {NavComponent} from "../_reusable-components/nav/nav.component";
import {generateGridDimensionsFromHeight} from "../_reusable-components/grid/namespace/functions";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  PlayerAssignmentDialogComponent
} from "../shared/components/player-assignment-dialog/player-assignment-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {PlayerRoleDisplayComponent} from "../shared/components/player-role-display/player-role-display.component";

@Component({
  selector: 'app-play-game',
  standalone: true,
  imports: [
    GridComponent,
    MatButton,
    CdkDropList,
    CdkDrag,
    NgStyle,
    MatTooltip,
    NavComponent,
    MatIcon,
    PlayerRoleDisplayComponent,
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
  gridStyles = {};

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private signalrService: SignalRService,
    private dialog: MatDialog
  ) {
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
    });
  }

  startGame() {
    console.log('Starting game');
    this.signalrService.invokeExplicitTrigger(TriggerEnum.GameStart);
  }

  positionGrid() {
    this.gridStyles = generateGridDimensionsFromHeight(this.cols, this.rows, 0.8, 1.25, 0.8, 0)
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
    const action = new Action(ActionEnum.MoveCard);
    action.addParameter(new Parameter(ActionParameterEnum.FromPositions, '' + fromPosition));
    action.addParameter(new Parameter(ActionParameterEnum.ToPosition, '' + toPosition));
    action.addParameter(new Parameter(ActionParameterEnum.Visibility, trueVisibility));
    this.signalrService.invokeExplicitAction(action);
    this.selectedVisibilityOption = null;
    this.selectedCellId = null;
    this.updateItemStyles();
  }


  openPlayerAssignmentDialog(): void {
    const dialogRef = this.dialog.open(PlayerAssignmentDialogComponent, {
      width: '700px',
      maxWidth: '90vw',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // No need to start game here, it's already running
      console.log('Player assignment dialog closed');
    });
  }
}
