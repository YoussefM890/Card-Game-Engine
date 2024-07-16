import {VisibilityEnum, VisibilityEnumView} from "../enums/visibility.enum";

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
