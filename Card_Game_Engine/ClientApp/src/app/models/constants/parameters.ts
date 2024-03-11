import {Parameter} from "../classes/parameter";
import {ParameterEnum} from "../enums/parameter.enum";

export const _parameters : Partial<Parameter>[] = [
  {
    id: ParameterEnum.CardCount,
    display: "Card Count"
  },
  {
    id: ParameterEnum.ShuffleCount,
    display: "Shuffle Count"
  },
  {
    id: ParameterEnum.FromPosition,
    display: "From Position"
  },
  {
    id: ParameterEnum.ToPosition,
    display: "To Position"
  }
];

export const parameters: Parameter[] = _parameters.map(p => new Parameter(p.id, p.display));
