import {CssStyleEnum} from "../enums/css-style.enum";

export class CssStyle {
  style: CssStyleEnum;
  value: string;

  constructor(style: CssStyleEnum, value: string) {
    this.style = style;
    this.value = value;
  }
}
