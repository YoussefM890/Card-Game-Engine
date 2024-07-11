import {Parameter} from "../classes/parameter";
import {ParameterEnum} from "../enums/parameter.enum";
import {ParameterValueTypeEnum} from "../enums/parameter-value-type.enum";
import {visibilityOptions} from "./parameter-value-options/visibility-options";

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
  },
  {
    id: ParameterEnum.By,
    display: "By"
  },
  {
    id: ParameterEnum.Visibility,
    display: "Visibility",
    type: ParameterValueTypeEnum.Select,
    args: visibilityOptions
  }
];

export const parameters: Parameter[] = _parameters.map(p => new Parameter(p.id, p.display, p.type, p.args));
