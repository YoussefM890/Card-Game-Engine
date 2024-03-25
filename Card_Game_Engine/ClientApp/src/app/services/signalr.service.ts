import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject} from "rxjs";
import {GameObject} from "../models/classes/game-object";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private gameSubject = new BehaviorSubject<GameObject>(new GameObject());
  public game$ = this.gameSubject.asObservable();
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
        this.receiveMessageListener();
        this.receiveGameObjectListener();

      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  //listeners
  receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(message);
    });
  }
  receiveGameObjectListener = () => {
    this.hubConnection.on('ReceiveGameObject', (gameObjects: GameObject) => {
      this.gameSubject.next(gameObjects);
    });
  }

  //emitters
  submitRules = (rules: any) =>
    this.hubConnection.invoke("SubmitRules", rules);

  startGame() {
    this.hubConnection.invoke("StartGame");
  }
}
