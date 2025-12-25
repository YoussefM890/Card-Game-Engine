import {VisibilityEnum} from "../enums/visibility.enum";

export class GridItem {
  id: number;
  visibility: VisibilityEnum;
  visibleTo: number[];
}
