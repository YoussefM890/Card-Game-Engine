import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../models/classes/card";
import {SuitEnum, suitsObject} from "../models/enums/suit.enum";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  rankSpots: { [key: number]: string[] } = {
    1: ['B3'],
    2: ['B1', 'B5'],
    3: ['B1', 'B3', 'B5'],
    4: ['A1', 'A5', 'C1', 'C5'],
    5: ['A1', 'A5', 'B3', 'C1', 'C5'],
    6: ['A1', 'A3', 'A5', 'C1', 'C3', 'C5'],
    7: ['A1', 'A3', 'A5', 'B2', 'C1', 'C3', 'C5'],
    8: ['A1', 'A3', 'A5', 'B2', 'B4', 'C1', 'C3', 'C5'],
    9: ['A1', 'A2', 'A4', 'A5', 'B3', 'C1', 'C2', 'C4', 'C5'],
    10: ['A1', 'A2', 'A4', 'A5', 'B2', 'B4', 'C1', 'C2', 'C4', 'C5'],
    11: ['C5'],
    12: ['C5'],
    13: ['C5'],
  }
  @Input() card: Card
  suits = suitsObject;
  suitEnum = SuitEnum;

  ngOnInit() {
    console.log(this.card)
  }
}
