import {ListToObject} from "../../../../shared/functions/global";
import {PlayerOptionEnum, VisibilityOptionEnum} from "../../../parameter/namespace/enums/parameter-value-options.enums";
import {Parameter} from "../../../parameter/namespace/classes/parameter";
import {ActionParameterEnum} from "../../../parameter/namespace/enums/parameter.enums";
import {ParameterValueTypeEnum} from "../../../parameter/namespace/enums/parameter-value-type.enum";
import {Action} from "../classes/action";
import {ActionEnum} from "../enums/action.enum";
import {SelectOption} from "../../../../shared/models/classes/select-option";


const text = ParameterValueTypeEnum.Text;
const select = ParameterValueTypeEnum.Select;
const positions = ParameterValueTypeEnum.Positions;
export const actions: Action[] = [
  new Action(ActionEnum.ShuffleDeck, "Shuffle Deck", [
    new Parameter(ActionParameterEnum.AtPositions, "At Positions", null, positions),
  ]),
  new Action(ActionEnum.MoveCard, "Move Cards", [
    new Parameter(ActionParameterEnum.FromPosition, "From Position", null, text, null, [
      ActionParameterEnum.FromPositions,
    ]),
    new Parameter(ActionParameterEnum.FromPositions, "From Positions", null, positions, null, [
      ActionParameterEnum.FromPosition,
      ActionParameterEnum.ToPositions,
    ]),
    new Parameter(ActionParameterEnum.ToPosition, "To Position", null, text, null, [
      ActionParameterEnum.ToPositions,
    ]),
    new Parameter(ActionParameterEnum.ToPositions, "To Positions", null, positions, null, [
      ActionParameterEnum.ToPosition,
      ActionParameterEnum.FromPositions,
    ]),
    new Parameter(ActionParameterEnum.CardCount, "Card Count (default is 1)", "Number of cards to move (0 to move all)", text),
    new Parameter(ActionParameterEnum.Visibility, "Visibility (default is Cell)", null, select, [
      new SelectOption(VisibilityOptionEnum.Keep, "Keep", "Keep the same visibility as the card had before the action"),
      new SelectOption(VisibilityOptionEnum.Cell, "Cell", "Set the visibility of the card to the visibility of the cell\""),
      new SelectOption(VisibilityOptionEnum.Visible, "Visible", "Visible to all players"),
      new SelectOption(VisibilityOptionEnum.Hidden, "Hidden", "Hidden from all players"),
      new SelectOption(VisibilityOptionEnum.Player1, "Player 1", "Visible to player 1 only"),
      new SelectOption(VisibilityOptionEnum.Player2, "Player 2", "Visible to player 2 only"),
    ]),
  ]),
  new Action(ActionEnum.AddScore, "Add Score", [
    new Parameter(ActionParameterEnum.Value, "Value To Add (default is 1)", null),
    new Parameter(ActionParameterEnum.Player, "Player", null, select, [
      new SelectOption(PlayerOptionEnum.Player1, "Player 1",),
      new SelectOption(PlayerOptionEnum.Player2, "Player 2",),
      new SelectOption(PlayerOptionEnum.Both, "Both Players",),
    ]),
  ]),
  new Action(ActionEnum.SetScore, "Set Score", [
    new Parameter(ActionParameterEnum.Value, "New Score (default is 1)", null),
    new Parameter(ActionParameterEnum.Player, "Player", null, select, [
      new SelectOption(PlayerOptionEnum.Player1, "Player 1",),
      new SelectOption(PlayerOptionEnum.Player2, "Player 2",),
      new SelectOption(PlayerOptionEnum.Both, "Both Players",),
    ]),
  ]),
];

export const actionsObject = ListToObject(actions, 'id');

