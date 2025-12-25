import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Trigger} from "./classes/trigger";
import {triggers} from "./constants/triggers";
import {ManualTrigger} from "../../../create-game/namespace/classes/manual-trigger";
import {SignalRService} from "../../../shared/services/signalr.service";
import {TriggerEnum} from "./enums/trigger.enum";
import {TriggerParameterEnum} from "../../parameter/namespace/enums/parameter.enums";
import {SelectOption} from "../../../shared/models/classes/select-option";

@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  private triggersSubject = new BehaviorSubject<Trigger[]>(triggers);
  triggers$ = this.triggersSubject.asObservable();

  constructor(private signalRService: SignalRService) {
    this.listenToManualTriggers();
    this.listenToPlayers();
  }

  listenToManualTriggers() {
    this.signalRService.ManualTrigger$.subscribe(
      (manualTriggers: ManualTrigger[]) => {
        const currentTriggers = this.triggersSubject.value.filter(t => t.id >= 0)
        currentTriggers.push(...manualTriggers.map(t => new Trigger(t.id, t.name + ' (Manual)',)))
        this.triggersSubject.next(currentTriggers);
      }
    );
  }

  listenToPlayers() {
    this.signalRService.Players$.subscribe((players) => {
      const playerSelectionOptions: SelectOption[] =
        players.map(p => new SelectOption(p.id, p.role));

      const setArgs = (triggerId: TriggerEnum, paramId: TriggerParameterEnum) => {
        const trig = this.triggersSubject.value.find(t => t.id === triggerId);
        const param = trig?.parameters.find(p => p.id === paramId);
        if (param) param.args = playerSelectionOptions;
      };

      // Score (Single Player): Player
      setArgs(TriggerEnum.ScoreSingle, TriggerParameterEnum.Player);

      // Score (Pairwise Difference): PlayerA, PlayerB
      setArgs(TriggerEnum.ScorePair, TriggerParameterEnum.PlayerA);
      setArgs(TriggerEnum.ScorePair, TriggerParameterEnum.PlayerB);

      // Score (Group Aggregate): Players (multi-select)
      setArgs(TriggerEnum.ScoreGroup, TriggerParameterEnum.Players);
    });
  }

}
