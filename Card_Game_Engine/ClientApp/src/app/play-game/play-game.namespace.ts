export namespace play_game {
  export enum VisibilityEnum {
    Keep = "0",
    Cell = "1",
    Visible = "2",
    Hidden = "3",
    Private = "4",
  }

  export const VisibilityEnumView = {
    [VisibilityEnum.Keep]: "Keep",
    [VisibilityEnum.Cell]: "Cell",
    [VisibilityEnum.Visible]: "Visible",
    [VisibilityEnum.Hidden]: "Hidden",
    [VisibilityEnum.Private]: "Private",
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
      VisibilityEnum.Keep,
      '#3e3e3e',
      '#d5d4d4',
      'keep the same visibility'
    ),
    new VisibilityOption(
      VisibilityEnum.Cell,
      '#002e5b',
      '#2e99fa',
      'Take the same visibility as the cell you are moving to.',
    ),
    new VisibilityOption(
      VisibilityEnum.Visible,
      '#2e4a00',
      '#a2d752',
      'make the card visible to everyone'
    ),
    new VisibilityOption(
      VisibilityEnum.Private,
      '#614a01',
      '#ffd753',
      'make the card visible only to you'
    ),
    new VisibilityOption(
      VisibilityEnum.Hidden,
      '#6a0000',
      '#ff9696',
      'make the card hidden to everyone'
    )
  ];
}
