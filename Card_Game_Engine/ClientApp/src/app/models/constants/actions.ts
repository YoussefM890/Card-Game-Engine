import {Action} from "../classes/action";
import {ActionEnum} from "../enums/action.enum";
import {Parameter} from "../classes/parameter";
import {ActionParameterEnum} from "../enums/parameter.enums";
import {ParameterValueTypeEnum} from "../enums/parameter-value-type.enum";
import {SelectOption} from "../classes/select-option";
import {VisibilityOptionsEnum} from "../enums/parameter-value-options.enums";

export const actions: Action[] = [
  new Action(ActionEnum.ShuffleDeck, "Shuffle Deck"),
  new Action(ActionEnum.MoveCard, "Move Card", [
    new Parameter(ActionParameterEnum.FromPosition, "From Position"),
    new Parameter(ActionParameterEnum.ToPosition, "To Position"),
    new Parameter(ActionParameterEnum.CardCount, "Card Count"),
    new Parameter(ActionParameterEnum.Visibility, "Visibility", ParameterValueTypeEnum.Select, [
      new SelectOption(VisibilityOptionsEnum.Keep, "Keep", "Keep the same visibility as the card had before the action"),
      new SelectOption(VisibilityOptionsEnum.Cell, "Cell", "Set the visibility of the card to the visibility of the cell\""),
      new SelectOption(VisibilityOptionsEnum.Visible, "Visible", "Visible to all players"),
      new SelectOption(VisibilityOptionsEnum.Hidden, "Hidden", "Hidden from all players"),
      new SelectOption(VisibilityOptionsEnum.Player1, "Player 1", "Visible to player 1 only"),
      new SelectOption(VisibilityOptionsEnum.Player2, "Player 2", "Visible to player 2 only"),
    ]),
  ]),
];

