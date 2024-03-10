import {Action} from "../classes/action";

const _actions: Partial<Action>[] = [
  {
    name:"ShuffleDeck"
  },
  {
    name :"StartGame"
  }
];

export const actions: Action[] = _actions.map(a => new Action(a.name));
