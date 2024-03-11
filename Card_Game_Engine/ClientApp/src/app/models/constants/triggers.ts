import {Trigger} from "../classes/trigger";
import {TriggerEnum} from "../enums/trigger.enum";

export const triggers: Trigger[] = [
  {
    id: TriggerEnum.GameStart,
    display: 'Game Start'
  },
  {
    id: TriggerEnum.CardDrawn,
    display: 'Card Drawn'
  },
];
