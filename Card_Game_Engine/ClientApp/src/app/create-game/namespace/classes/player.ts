import {PerspectiveEnum} from "../enums/perspective.enum";

export class Player {
  id: number;
  role: string;
  description: string;
  perspective: PerspectiveEnum;
  score: number;
}
