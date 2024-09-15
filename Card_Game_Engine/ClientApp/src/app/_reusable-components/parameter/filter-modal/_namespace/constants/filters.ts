import {FilterTemplate} from "../classes/filter";
import {FilterEnum} from "../enums/filter.enum";
import {filterConditions} from "./filter-conditions";
import {ReferenceEnum} from "../enums/reference.enum";

export const filters: Readonly<Record<FilterEnum, FilterTemplate>> = {
  [FilterEnum.Card]: new FilterTemplate(FilterEnum.Card, 'Card Filter', [
    filterConditions[ReferenceEnum.Suit],
    filterConditions[ReferenceEnum.FaceValue]
  ]),
}
