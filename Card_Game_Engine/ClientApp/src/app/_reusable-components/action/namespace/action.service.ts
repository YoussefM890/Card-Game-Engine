import {Injectable} from "@angular/core";
import {ActionParameterEnum} from "../../parameter/namespace/enums/parameter.enums";
import {BehaviorSubject} from "rxjs";
import {Action} from "./classes/action";
import {actions} from "./constants/actions";
import {SignalRService} from "../../../shared/services/signalr.service";
import {SelectOption} from "../../../shared/models/classes/select-option";
import {ActionEnum} from "./enums/action.enum";

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private actionsSubject = new BehaviorSubject<Action[]>(actions);
  actions$ = this.actionsSubject.asObservable();

  constructor(private signalRService: SignalRService) {
    this.listenToPlayers();
  }

  listenToPlayers() {
    this.signalRService.Players$.subscribe((players) => {
      const playerSelectionOptions: SelectOption[] =
        players.map(p => new SelectOption(p.id, p.role));

      const setArgs = (actionId: ActionEnum, paramId: ActionParameterEnum) => {
        const trig = this.actionsSubject.value.find(a => a.id === actionId);
        const param = trig?.parameters.find(p => p.id === paramId);
        if (param) param.args = playerSelectionOptions;
      };

      setArgs(ActionEnum.SetScore, ActionParameterEnum.Players);
      setArgs(ActionEnum.AddScore, ActionParameterEnum.Players);
    });
  }

}
