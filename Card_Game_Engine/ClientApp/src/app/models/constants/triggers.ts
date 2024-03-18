import {Trigger} from "../classes/trigger";
import {TriggerEnum} from "../enums/trigger.enum";

const _triggers: Partial<Trigger>[] = [
  {
    id: TriggerEnum.GameStart,
    display: 'Game Start'
  },
  {
    id: TriggerEnum.CardMoved,
    display: 'Card Moved'
  },
];

export const triggers: Trigger[] = _triggers.map(t => new Trigger(t.id, t.display));
