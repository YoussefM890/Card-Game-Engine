import {VisibilityOption} from "../classes/visibility-option";
import {VisibilityEnum, VisibilityEnumView} from "../enums/visibility.enum";
import {ColorEnum} from "../../../shared/models/enums/color.enum";

export const visibilityOptions: VisibilityOption[] = [
  new VisibilityOption(
    VisibilityEnum.All,
    VisibilityEnumView[VisibilityEnum.All],
    ColorEnum.DarkGreen,
    ColorEnum.Green,
    'make the card visible to everyone'
  ),
  new VisibilityOption(
    VisibilityEnum.None,
    VisibilityEnumView[VisibilityEnum.None],
    ColorEnum.DarkRed,
    ColorEnum.Red,
    'make the card hidden to everyone'
  ),
  new VisibilityOption(
    VisibilityEnum.Specific,
    VisibilityEnumView[VisibilityEnum.Specific],
    ColorEnum.DarkYellow,
    ColorEnum.Yellow,
    'make the card visible only to you'
  ),
];
