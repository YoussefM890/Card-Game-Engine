import {ColorEnum} from "../../../shared/models/enums/color.enum";
import {PerspectiveEnum, PerspectiveEnumView} from "../enums/perspective.enum";

export class PerspectiveOption {
  value: PerspectiveEnum;
  display: string;
  color: ColorEnum;
  background: ColorEnum;
  description: string;
  disabled: boolean;

  constructor(
    value: PerspectiveEnum,
    color: ColorEnum,
    background: ColorEnum,
    description: string = null,
    disabled: boolean = false,
  ) {
    this.value = value;
    this.display = PerspectiveEnumView[value];
    this.color = color;
    this.background = background;
    this.description = description;
    this.disabled = disabled;
  }
}
