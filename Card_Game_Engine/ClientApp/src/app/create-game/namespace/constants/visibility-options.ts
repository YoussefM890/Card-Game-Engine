import {VisibilityOption} from "../classes/visibility-option";
import {VisibilityEnum} from "../enums/visibility.enum";

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
