import {Component, HostListener, OnInit} from '@angular/core';
import {GridComponent} from "../_reusable-components/grid/grid.component";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SignalRService} from "../services/signalr.service";
import {GameObject} from "../models/classes/game-object";
import {GridItem} from "../models/classes/grid-item";

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

  constructor(private signalrService: SignalRService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.positionGrid();
  }

  ngOnInit(): void {
    this.positionGrid();
    this.setupGameListener();
  }

  positionGrid() {
    const numberOfColumns = 12;
    const numberOfRows = 7;
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const gridHeight = 0.8;
    const aspectRatio = 1.25; // width to height ratio
    let gridWidth = (screenHeight * gridHeight * numberOfColumns) /
      (screenWidth * numberOfRows * aspectRatio);
    this.gridWidthStyle = gridWidth * 100 + '%';
  }

  startGame() {
    console.log('Starting game');
    this.signalrService.startGame();
  }

  setupGameListener() {
    this.signalrService.game$.subscribe((game: GameObject) => {
      this.grid = [...game.grid];
      console.log('Game updated', game)
    });
  }
}
