import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {SignalrListenerService} from "./signalr-listener.service";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  constructor() {
  }
  public getHubConnection(){return this.hubConnection};

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/connect')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
        console.log(this.hubConnection);
        this.receiveMessageListener();

      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(message);
    });
  }
  //emitters
  ProcessRules = (rules : any) =>
    this.hubConnection.invoke("ProcessRules", rules);
}
