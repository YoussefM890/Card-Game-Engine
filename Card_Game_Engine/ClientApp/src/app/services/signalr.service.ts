import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject} from 'rxjs';
import {ActionDTO} from '../models/classes/action';
import {CreateGame} from '../models/classes/create-game';
import {GameObject} from "../models/classes/game-object";
import {mirrorGrid} from "./signalr.functions";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private gameSubject = new BehaviorSubject<GameObject>(new GameObject());
  public game$ = this.gameSubject.asObservable();
  private readonly baseUrl = `${window.location.protocol}//${window.location.host}`;

  private userNumber: number;

  constructor() {
    console.log('SignalRService instantiated');
    if (this.baseUrl.includes('localhost')) {
      this.baseUrl = this.baseUrl.replace('4200', '5000');
    }
  }

  public getHubConnection() {
    return this.hubConnection;
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/connect')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.userConnectedListener();
        this.receiveMessageListener();
        this.receiveGameObjectListener();
        this.userNumberListener();
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public stopConnection = () => {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop()
        .then(() => console.log('Connection stopped'))
        .catch(err => console.log('Error while stopping connection: ' + err));
    }
  }

  // Emitters
  public submitRules = (rules: any) => {
    this.hubConnection.invoke('SubmitRules', rules);
  }

  public createGame(game: CreateGame) {
    console.log('Creating game:', game);
    this.hubConnection.invoke('CreateGame', game);
  }

  public startGame() {
    console.log('Starting game');
    this.hubConnection.invoke('StartGame');
  }

  public invokeExplicitAction(action: ActionDTO) {
    console.log('Invoking action:', action);
    this.hubConnection.invoke('InvokeExplicitAction', action);
  }

  // Listeners
  private userConnectedListener = () => {
    this.hubConnection.on('UserConnected', (userNumber: number | string) => {
      console.log('User connected:', userNumber);
    });
  }

  private userNumberListener = () => {
    this.hubConnection.on('GetUserNumber', (userNumber: number) => {
      console.log('User number:', userNumber);
      this.userNumber = userNumber;
    });
  }

  private receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log('Received message:', message);
    });
  }

  private receiveGameObjectListener = () => {
    this.hubConnection.on('ReceiveGameObject', (gameObject: GameObject) => {
      console.log('Received game object:', gameObject);
      if (this.userNumber % 2 === 0) {
        gameObject.grid = mirrorGrid(gameObject.grid, gameObject.height, gameObject.width);
      }
      this.gameSubject.next(gameObject);
    });
  }
}
