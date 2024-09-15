import {FilterEnum} from "../enums/filter.enum";
import {FilterConditionTemplate} from "./filter-condition-template";

export class FilterTemplate {
  id: FilterEnum;
  name: string;
  conditions: FilterConditionTemplate[];

  constructor(id: FilterEnum, name: string, conditions: FilterConditionTemplate[] = []) {
    this.id = id;
    this.name = name;
    this.conditions = conditions;
  }
}

