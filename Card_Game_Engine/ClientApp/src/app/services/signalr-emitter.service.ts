import {Injectable} from '@angular/core';
import {SignalRService} from "./signalr.service";
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrEmitterService {

  hubConnection : signalR.HubConnection
  constructor(private mainService : SignalRService) {
    this.hubConnection = mainService.getHubConnection();
  }

  ProcessRules = (rules : any) =>
    this.hubConnection.invoke("ProcessRules", rules);
}
