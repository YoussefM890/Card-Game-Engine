import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SignalRService} from "../services/signalr.service";
import {GameObject} from "../models/classes/game-object";
import {GridItem} from "../models/classes/grid-item";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-play-game',
  standalone: true,
  imports: [
    GridComponent,
    MatButton,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.scss'
})
export class PlayGameComponent implements OnInit {
  grid: GridItem[] = [];
  gridWidthStyle = '60%';
  cols: number
  rows: number

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
}
