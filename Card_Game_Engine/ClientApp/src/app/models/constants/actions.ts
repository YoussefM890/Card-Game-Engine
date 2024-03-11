import {Action} from "../classes/action";
import {ActionEnum} from "../enums/action.enum";

const _actions: Partial<Action>[] = [
  {
    id: ActionEnum.ShuffleDeck,
    display: "Shuffle Deck"
  },
  {
    id: ActionEnum.StartGame,
    display: "Start Game"
  },
  {
    id: ActionEnum.MoveCard,
    display: "Move Card"
  }
];

export const actions: Action[] = _actions.map(a => new Action(a.id, a.display));
