import {SelectOption} from "../../../../models/classes/select-option";
import {ListToObject} from "../../../../shared/functions/global";
import {VisibilityOptionsEnum} from "../../../parameter/namespace/enums/parameter-value-options.enums";
import {Parameter} from "../../../parameter/namespace/classes/parameter";
import {ActionParameterEnum} from "../../../parameter/namespace/enums/parameter.enums";
import {ParameterValueTypeEnum} from "../../../parameter/namespace/enums/parameter-value-type.enum";
import {Action} from "../classes/action";
import {ActionEnum} from "../enums/action.enum";


const text = ParameterValueTypeEnum.Text;
const select = ParameterValueTypeEnum.Select;
export const actions: Action[] = [
  new Action(ActionEnum.ShuffleDeck, "Shuffle Deck", [
    new Parameter(ActionParameterEnum.AtPosition, "At Position"),
  ]),
  new Action(ActionEnum.MoveCard, "Move Cards", [
    new Parameter(ActionParameterEnum.FromPositions, "From Positions"),
    new Parameter(ActionParameterEnum.ToPosition, "To Position"),
    new Parameter(ActionParameterEnum.CardCount, "Card Count (default is 1)", "Number of cards to move (0 to move all)", text),
    new Parameter(ActionParameterEnum.Visibility, "Visibility (default is Keep)", null, select, [
      new SelectOption(VisibilityOptionsEnum.Keep, "Keep", "Keep the same visibility as the card had before the action"),
      new SelectOption(VisibilityOptionsEnum.Cell, "Cell", "Set the visibility of the card to the visibility of the cell\""),
      new SelectOption(VisibilityOptionsEnum.Visible, "Visible", "Visible to all players"),
      new SelectOption(VisibilityOptionsEnum.Hidden, "Hidden", "Hidden from all players"),
      new SelectOption(VisibilityOptionsEnum.Player1, "Player 1", "Visible to player 1 only"),
      new SelectOption(VisibilityOptionsEnum.Player2, "Player 2", "Visible to player 2 only"),
    ]),
  ]),
];

export const actionsObject = ListToObject(actions, 'id');

