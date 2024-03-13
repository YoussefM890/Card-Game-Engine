import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalrListenerService {
  private hubConnection: signalR.HubConnection;

  constructor(hubConnection: signalR.HubConnection) {
    this.hubConnection = hubConnection;
  }
  public receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(message);
    });
  }
}
