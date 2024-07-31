import {VisibilityOption} from "../classes/visibility-option";
import {VisibilityEnum} from "../enums/visibility.enum";
import {ColorEnum} from "../../../shared/models/enums/color.enum";

export const visibilityOptions: VisibilityOption[] = [
  new VisibilityOption(
    VisibilityEnum.Visible,
    ColorEnum.DarkGreen,
    ColorEnum.Green,
    'make the card visible to everyone'
  ),
  new VisibilityOption(
    VisibilityEnum.Hidden,
    ColorEnum.DarkRed,
    ColorEnum.Red,
    'make the card hidden to everyone'
  ),
  new VisibilityOption(
    VisibilityEnum.Player1,
    ColorEnum.DarkBlue,
    ColorEnum.Blue,
    'Take the same visibility as the cell you are moving to.',
  ),
  new VisibilityOption(
    VisibilityEnum.Player2,
    ColorEnum.DarkYellow,
    ColorEnum.Yellow,
    'make the card visible only to you'
  ),
];
