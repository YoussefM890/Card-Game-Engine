import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SignalRService} from "../services/signalr.service";
import {GameObject} from "../models/classes/game-object";
import {DOCUMENT, NgStyle} from "@angular/common";
import {GridTransferItem} from "../models/classes/grid-transfer-item";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatTooltip} from "@angular/material/tooltip";
import {CssStyle} from "../models/classes/css-style";
import {CssStyleEnum} from "../models/enums/css-style.enum";
import {ActionDTO} from "../models/classes/action";
import {ActionEnum} from "../models/enums/action.enum";
import {ParameterDTO} from "../models/classes/parameter";
import {play_game} from "./play-game.namespace";
import {ActionParameterEnum} from "../models/enums/parameter.enums";
import {VisibilityOptionsEnum} from "../models/enums/parameter-value-options.enums";

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
    MatTooltip
  ],
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.scss'
})
export class PlayGameComponent implements OnInit {
  grid: GridTransferItem[] = [];
  gridWidthStyle = '60%';
  cols: number
  rows: number
  visibilityOptions = play_game.visibilityOptions;
  selectedVisibilityOption = null;
  selectedCellId: number = null;
  itemStyles = null;

  constructor(@Inject(DOCUMENT) private document: Document, private signalrService: SignalRService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.positionGrid();
  }

  ngOnInit(): void {
    this.setupGameListener();
  }

  positionGrid() {
    const screenHeight = this.document.documentElement.clientHeight;
    const screenWidth = this.document.documentElement.clientWidth;
    const gridHeight = 0.8;
    const aspectRatio = 1.25; // width to height ratio
    let gridWidth = (screenHeight * gridHeight * this.cols) /
      (screenWidth * this.rows * aspectRatio);
    this.gridWidthStyle = gridWidth * 100 + '%';
  }

  startGame() {
    console.log('Starting game');
    this.signalrService.startGame();
  }

  setupGameListener() {
    this.signalrService.game$.subscribe((gameObject: GameObject) => {
      this.grid = [...gameObject.grid];
      if (this.cols != gameObject.width || this.rows != gameObject.height) {
        this.cols = gameObject.width;
        this.rows = gameObject.height;
        this.positionGrid();
      }
    });
  }

  onCellClick(item: GridTransferItem) {
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

  private moveCard(fromPosition: number, toPosition: number, visibilityOption: play_game.VisibilityOption) {
    console.log(`Moving card ${fromPosition} to ${toPosition} with visibility ${visibilityOption.display}`);
    let trueVisibility: string = visibilityOption.value;
    if (visibilityOption.value === play_game.VisibilityEnum.Private) {
      this.signalrService.userNumber % 2 === 0 ? trueVisibility = VisibilityOptionsEnum.Player2 : trueVisibility = VisibilityOptionsEnum.Player1;
    }
    const action = new ActionDTO(ActionEnum.MoveCard);
    action.addParameter(new ParameterDTO(ActionParameterEnum.FromPosition, '' + fromPosition));
    action.addParameter(new ParameterDTO(ActionParameterEnum.ToPosition, '' + toPosition));
    action.addParameter(new ParameterDTO(ActionParameterEnum.Visibility, trueVisibility));
    this.signalrService.invokeExplicitAction(action);
    this.selectedVisibilityOption = null;
    this.selectedCellId = null;
    this.updateItemStyles();
  }

  private updateItemStyles() {
    this.itemStyles = {};
    if (this.selectedCellId !== null && this.selectedVisibilityOption !== null) {
      this.itemStyles[this.selectedCellId] = [
        new CssStyle(CssStyleEnum.BoxShadow, `0 0 10px 5px ${this.selectedVisibilityOption.background}`)
      ];
    }
  }

}
