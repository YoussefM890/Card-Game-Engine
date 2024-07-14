export namespace create_game {
  export enum VisibilityEnum {
    Visible = 2,
    Hidden = 3,
    Player1 = 4,
    Player2 = 5,
  }

  export const VisibilityEnumView = {
    [VisibilityEnum.Visible]: "Visible",
    [VisibilityEnum.Hidden]: "Hidden",
    [VisibilityEnum.Player1]: "Player 1",
    [VisibilityEnum.Player2]: "Player 2",
  } as const;

  export type VisibilityEnumType = keyof typeof VisibilityEnumView;

  export class VisibilityOption {
    value: VisibilityEnum;
    display: string;
    color: string;
    background: string;
    description: string;
    disabled: boolean;

    constructor(
      value: VisibilityEnum,
      color: string,
      background: string,
      description: string = null,
      disabled: boolean = false,
    ) {
      this.value = value;
      this.display = VisibilityEnumView[value];
      this.color = color;
      this.background = background;
      this.description = description;
      this.disabled = disabled;
    }
  }

  export const visibilityOptions: VisibilityOption[] = [
    new VisibilityOption(
      VisibilityEnum.Visible,
      '#2e4a00',
      '#a2d752',
      'make the card visible to everyone'
    ),

    new VisibilityOption(
      VisibilityEnum.Hidden,
      '#6a0000',
      '#ff9696',
      'make the card hidden to everyone'
    ),
    new VisibilityOption(
      VisibilityEnum.Player1,
      '#002e5b',
      '#2e99fa',
      'Take the same visibility as the cell you are moving to.',
    ),
    new VisibilityOption(
      VisibilityEnum.Player2,
      '#614a01',
      '#ffd753',
      'make the card visible only to you'
    ),
  ];

  export class GridItem {
    id: number;
    visibility: VisibilityEnum;
  }

  export class Card {
    value: number;
    suit: number;

    constructor(value: number, suit: number) {
      this.value = value;
      this.suit = suit;
    }
  }
}
