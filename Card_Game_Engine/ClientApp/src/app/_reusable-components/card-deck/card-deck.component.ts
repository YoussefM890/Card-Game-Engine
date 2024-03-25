import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Card} from "../../models/classes/card";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-card-deck',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './card-deck.component.html',
  styleUrl: './card-deck.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDeckComponent {
  @Input() cards: Card[] = [];
}
