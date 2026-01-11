import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SuitEnum, suitsObject} from "../../create-game/namespace/enums/suit.enum";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @ViewChild('cardElm') cardElement: ElementRef;
  @Input() card: any;

  suits = suitsObject;
  suitEnum = SuitEnum;

  /**
   * Get the image path for the current card
   * Maps card value and suit to the correct PNG filename
   */
  getCardImagePath(): string {
    // Map suit enum to card image naming convention
    const suitMap: Record<SuitEnum, string> = {
      [SuitEnum.HEARTS]: 'hearts',
      [SuitEnum.DIAMONDS]: 'diamonds',
      [SuitEnum.CLUBS]: 'clubs',
      [SuitEnum.SPADES]: 'spades',
      [SuitEnum.OTHER]: 'hearts', // fallback
    };

    // Map card values to their names in the image files
    const valueMap: Record<number, string> = {
      1: 'ace',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: 'jack',
      12: 'queen',
      13: 'king',
      14: 'black_joker', // or red_joker based on suit
    };

    const suitName = suitMap[this.card.suit] || 'hearts';
    const valueName = valueMap[this.card.value] || 'ace';

    // Handle jokers specially
    if (this.card.value === 14) {
      return `assets/images/cards/${valueName}.png`;
    }

    // Format: ace_of_hearts.png, 2_of_clubs.png, etc.
    return `assets/images/cards/${valueName}_of_${suitName}.png`;
  }
}
