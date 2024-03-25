import {Card} from "./card";

export class GridItem {
  id: number;
  cards: Card[];

  constructor(id: number, cards: Card[] = []) {
    this.id = id;
    this.cards = cards;
  }
}
