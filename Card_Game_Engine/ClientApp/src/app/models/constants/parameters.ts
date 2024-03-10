import {Parameter} from "../classes/parameter";

export const _parameters : Partial<Parameter>[] = [
  {
    key: 'CardCount',
  },
  {
    //what parameter could be added to shuffle deck?
    key : 'ShuffleCount',
  }
];

export const parameters : Parameter[] = _parameters.map(p => new Parameter(p.key));
