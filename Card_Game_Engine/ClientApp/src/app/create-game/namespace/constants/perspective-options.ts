import {ColorEnum} from "../../../shared/models/enums/color.enum";
import {PerspectiveOption} from "../classes/perspective-option";
import {PerspectiveEnum} from "../enums/perspective.enum";

export const perspectiveOptions: PerspectiveOption[] = [
  new PerspectiveOption(
    PerspectiveEnum.Bottom,
    ColorEnum.DarkGreen,
    ColorEnum.Green,
    'view cards from bottom perspective'
  ),
  new PerspectiveOption(
    PerspectiveEnum.Top,
    ColorEnum.DarkRed,
    ColorEnum.Red,
    'view cards from top perspective (180° rotation)'
  ),
  new PerspectiveOption(
    PerspectiveEnum.Left,
    ColorEnum.DarkBlue,
    ColorEnum.Blue,
    'view cards from left perspective (90° counter-clockwise)'
  ),
  new PerspectiveOption(
    PerspectiveEnum.Right,
    ColorEnum.DarkOrange,
    ColorEnum.Orange,
    'view cards from right perspective (90° clockwise)'
  ),
];
