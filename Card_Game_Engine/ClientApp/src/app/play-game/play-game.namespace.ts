import {ColorEnum} from "../shared/models/enums/color.enum";

export namespace play_game {
  export enum VisibilityEnum {
    Keep = "0",
    Cell = "1",
    Visible = "2",
    Hidden = "3",
    Private = "4",
  }

  export const VisibilityEnumView: Readonly<Record<VisibilityEnum, string>> = {
    [VisibilityEnum.Keep]: "Keep",
    [VisibilityEnum.Cell]: "Cell",
    [VisibilityEnum.Visible]: "Visible",
    [VisibilityEnum.Hidden]: "Hidden",
    [VisibilityEnum.Private]: "Private",
  };

  export class VisibilityOption {
    value: VisibilityEnum;
    display: string;
    color: string;
    background: string;
    description: string;
    disabled: boolean;

    constructor(
      value: VisibilityEnum,
      color: ColorEnum,
      background: ColorEnum,
      description: string = null,
      disabled: boolean = true,
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
      VisibilityEnum.Cell,
      ColorEnum.DarkBlue,
      ColorEnum.Blue,
      'Take the same visibility as the cell you are moving to.',
      false,
    ),
    new VisibilityOption(
      VisibilityEnum.Keep,
      ColorEnum.DarkGray,
      ColorEnum.Gray,
      'keep the same visibility'
    ),
    new VisibilityOption(
      VisibilityEnum.Visible,
      ColorEnum.DarkGreen,
      ColorEnum.Green,
      'make the card visible to everyone'
    ),
    new VisibilityOption(
      VisibilityEnum.Private,
      ColorEnum.DarkYellow,
      ColorEnum.Yellow,
      'make the card visible only to you'
    ),
    new VisibilityOption(
      VisibilityEnum.Hidden,
      ColorEnum.DarkRed,
      ColorEnum.Red,
      'make the card hidden to everyone'
    )
  ];
}
