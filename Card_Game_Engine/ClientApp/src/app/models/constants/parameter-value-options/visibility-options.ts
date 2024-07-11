import {SelectOption} from "../../classes/select-option";

export enum VisibilityOptionsEnum {
  Keep = "0",
  Cell = "1",
  Visible = "2",
  Hidden = "3",
  Player1 = "4",
  Player2 = "5",
}

export const visibilityOptions: SelectOption[] = [
  new SelectOption("0", VisibilityOptionsEnum.Keep, "Keep the same visibility as the card had before the action"),
  new SelectOption("1", VisibilityOptionsEnum.Cell, "Set the visibility of the card to the visibility of the cell"),
  new SelectOption("2", VisibilityOptionsEnum.Visible, "Visible to all players"),
  new SelectOption("3", VisibilityOptionsEnum.Hidden, "Hidden from all players"),
  new SelectOption("4", VisibilityOptionsEnum.Player1, "Visible to player 1 only"),
  new SelectOption("5", VisibilityOptionsEnum.Player2, "Visible to player 2 only")
]

