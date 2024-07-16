import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject} from 'rxjs';
import {mirrorGrid} from "./signalr.functions";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Game as CreateGame} from "../create-game/namespace/classes/game";
import {Action} from "../play-game/namespace/classes/action";
import {Game as PlayGame} from "../play-game/namespace/classes/game";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private readonly baseUrl = `${window.location.protocol}//${window.location.host}`;
  private hubConnection: signalR.HubConnection;
  private gameSubject = new BehaviorSubject<PlayGame>(new PlayGame());
  public game$ = this.gameSubject.asObservable();
  private _userNumber: number;
  public createGameForm: FormGroup = null;

  constructor(private fb: FormBuilder) {
    console.log('SignalRService instantiated');
    if (this.baseUrl.includes('localhost')) {
      this.baseUrl = this.baseUrl.replace('4200', '5000');
    }
    this.buildCreateGameForm()
  }

  private buildCreateGameForm() {
    this.createGameForm = this.fb.group({
      rules: this.fb.array([]),
      width: 9,
      height: 5,
      startingDeck: this.fb.array([]),
      grid: {}
    });
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

  public invokeExplicitAction(action: Action) {
    console.log('Invoking action:', action);
    this.hubConnection.invoke('InvokeExplicitAction', action);
  }

  // Listeners
  private userConnectedListener = () => {
    this.hubConnection.on('UserConnected', (userNumber: number | string) => {
      console.log('User connected:', userNumber);
    });
  }


  private receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log('Received message:', message);
    });
  }

  private userNumberListener = () => {
    this.hubConnection.on('GetUserNumber', (userNumber: number) => {
      console.log('User number:', userNumber);
      this._userNumber = userNumber;
    });
  }

  private receiveGameObjectListener = () => {
    this.hubConnection.on('ReceiveGameObject', (gameObject: PlayGame) => {
      console.log('Received game object:', gameObject);
      if (this._userNumber % 2 === 0) {
        gameObject.grid = mirrorGrid(gameObject.grid, gameObject.height, gameObject.width);
      }
      this.gameSubject.next(gameObject);
    });
  }

  get userNumber(): number {
    return this._userNumber;
  }
}
