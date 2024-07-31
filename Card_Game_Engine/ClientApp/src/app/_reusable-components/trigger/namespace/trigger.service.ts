import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Trigger} from "./classes/trigger";
import {triggers} from "./constants/triggers";
import {ManualTrigger} from "../../../create-game/namespace/classes/manual-trigger";
import {SignalRService} from "../../../shared/services/signalr.service";

@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  private triggersSubject = new BehaviorSubject<Trigger[]>(triggers);
  triggers$ = this.triggersSubject.asObservable();

  constructor(private signalRService: SignalRService) {
    this.listenToManualTriggers();
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


  // addTrigger(trigger: Trigger) {
  //   const currentTriggers = this.triggersSubject.value;
  //   this.triggersSubject.next([...currentTriggers, trigger]);
  //   this.updateManualTriggerOptions();
  // }
  //
  // private updateManualTriggerOptions() {
  //   const currentTriggers = this.triggersSubject.value;
  //   const manualTrigger = currentTriggers.find(t => t.type === TriggerEnum.Manual);
  //   if (manualTrigger) {
  //     const triggerNames = currentTriggers
  //       .filter(t => t.type !== TriggerEnum.Manual)
  //       .map(t => t.name);
  //     manualTrigger.parameters[0].options = triggerNames;
  //   }
  //   this.triggersSubject.next(currentTriggers);
  // }
}
