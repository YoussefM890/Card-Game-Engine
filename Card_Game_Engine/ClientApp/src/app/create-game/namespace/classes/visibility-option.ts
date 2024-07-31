import {VisibilityEnum, VisibilityEnumView} from "../enums/visibility.enum";
import {ColorEnum} from "../../../shared/models/enums/color.enum";

export class VisibilityOption {
  value: VisibilityEnum;
  display: string;
  color: ColorEnum;
  background: ColorEnum;
  description: string;
  disabled: boolean;

  constructor(
    value: VisibilityEnum,
    color: ColorEnum,
    background: ColorEnum,
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
