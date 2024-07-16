import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {SuitEnum, suitsObject} from "../../create-game/namespace/enums/suit.enum";
import {distinctCardsValueObject} from "./namespace/constants/distinct-cards";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, AfterViewInit {
  @ViewChild('cardElm') cardElement: ElementRef;
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
  @Input() card: any
  suits = suitsObject;
  suitEnum = SuitEnum;
  distinctCardValueObject = distinctCardsValueObject;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.adjustCardSize();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.adjustCardSize();
  }

  adjustCardSize() {
    const card = this.cardElement.nativeElement;
    const cardWidth = card.offsetWidth;
    const fontSize = cardWidth * 0.25;
    card.style.fontSize = fontSize + 'px';
  }
}
