import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject, startWith, Subscription} from 'rxjs';
import {mirrorGrid} from "./signalr.functions";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Game as CreateGame} from "../../create-game/namespace/classes/game";
import {Action} from "../../play-game/namespace/classes/action";
import {Game as PlayGame} from "../../play-game/namespace/classes/game";
import {ManualTrigger} from "../../create-game/namespace/classes/manual-trigger";
import {ConfigService} from "./config.service";
import {Router} from "@angular/router";
import {RoleEnum} from "../models/enums/role.enum";
import {UserInfo} from "../models/classes/user-info";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Alert} from "../models/classes/alert";
import {AlertTypeEnumClass} from "../models/enums/alert-type.enum";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private baseUrl: string;
  private hubConnection: signalR.HubConnection;

  private gameSubject = new BehaviorSubject<PlayGame>(new PlayGame());
  private ManualTriggerSubject = new BehaviorSubject<ManualTrigger[]>([]);
  public createGameForm: FormGroup;

  public game$ = this.gameSubject.asObservable();
  public ManualTrigger$ = this.ManualTriggerSubject.asObservable();
  private userInfoSubject = new BehaviorSubject<UserInfo>(
    null
    // {
    //   roomId: 'static room id',
    //   role: RoleEnum.Player1,
    //   isRoomOwner: true,
    // }
  );
  public userInfo$ = this.userInfoSubject.asObservable();
  private manualTriggersSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private configService: ConfigService,
              private router: Router,
              private snackbar: MatSnackBar,
  ) {
    this.baseUrl = this.configService.baseUrl;
    if (this.baseUrl.includes('localhost')) {
      this.baseUrl = this.baseUrl.replace('4200', '5000');
    }
    this.buildCreateGameForm()
  }

  public invokeExplicitTrigger(trigger: any) {
    this.hubConnection.invoke('InvokeExplicitTrigger', trigger);
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + '/connect')
      .build();

    this.hubConnection.serverTimeoutInMilliseconds = 1200000
    this.hubConnection
      .start()
      .then(() => {
        this.userConnectedListener();
        this.receiveMessageListener();
        this.receiveGameObjectListener();
        this.receiveUserInfoListener();
        this.receiveErrorMessageListener();
        this.userJoinedRoomListener();
        this.userLeftRoomListener();
        this.receiveAlertListener();

      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public leaveRoom() {
    this.hubConnection.invoke('LeaveRoom');
    this.resetRoom()
  }

  public stopConnection = () => {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop()
        .then(() => console.log('Connection stopped'))
        .catch(err => console.log('Error while stopping connection: ' + err));
    }
  }

  // Emitters
  public createRoom = () => {
    this.hubConnection.invoke('CreateRoom');
  }

  public joinRoom = (roomId: string) => {
    this.hubConnection.invoke('JoinRoom', roomId);
  }

  public submitRules = (rules: any) => {
    this.hubConnection.invoke('SubmitRules', rules);
  }

  public createGame(game: CreateGame) {
    console.log('Creating game:', game);
    this.hubConnection.invoke('CreateGame', game);
  }

  public invokeExplicitAction(action: Action) {
    this.hubConnection.invoke('InvokeExplicitAction', action);
  }

  private buildCreateGameForm() {
    this.createGameForm = this.fb.group({
      rules: this.fb.array([]),
      width: 9,
      height: 5,
      startingDeck: this.fb.array([]),
      grid: {},
      manualTriggers: this.fb.array([]),
    });
    // this.createGameForm = JsonToForm(defaultGameObject);
    this.listenToManualTriggers();
  }

  private resetRoom() {
    this.router.navigate(['/home']);
    this.buildCreateGameForm();
    this.userInfoSubject.next(null);
    this.gameSubject.next(new PlayGame());
  }


  // Listeners
  private userConnectedListener = () => {
    this.hubConnection.on('UserConnected', (userNumber: number | string) => {
      console.log('User connected:', userNumber);
    });
  }


  private receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log('Received message :', message);
    });
  }

  private receiveUserInfoListener = () => {
    this.hubConnection.on('ReceiveUserInfo', (userInfo: UserInfo) => {
      if (userInfo == null) {
        this.resetRoom()
      } else {
        userInfo.isRoomOwner ? this.router.navigate(['/create']) : this.router.navigate(['/play']);
      }
      this.userInfoSubject.next(userInfo);
      console.log('Received room:', userInfo);
    });
  }
  private receiveGameObjectListener = () => {
    this.hubConnection.on('ReceiveGameObject', (gameObject: PlayGame) => {
      console.log('Received game object:', gameObject);
      if (this.userInfo.role === RoleEnum.Player2) {
        gameObject.grid = mirrorGrid(gameObject.grid, gameObject.height, gameObject.width);
      }
      this.gameSubject.next(gameObject);
      // this.ManualTriggerSubject.next(gameObject.manualTriggers);
    });
  }

  private receiveErrorMessageListener = () => {
    this.hubConnection.on('ReceiveError', (error: string) => {
    });
  }

  private userJoinedRoomListener = () => {
    this.hubConnection.on('UserJoinedRoom', (userId: string) => {
    });
  }
  private userLeftRoomListener = () => {
    this.hubConnection.on('UserLeftRoom', (userId: string) => {
    });
  }

  private receiveAlertListener() {
    this.hubConnection.on('ReceiveAlert', (alert: Alert) => {
      console.log('Received alert:', alert);
      console.log('Alert type:', AlertTypeEnumClass[alert.type])
      this.snackbar.open(alert.message, '', {
        duration: 3000,
        panelClass: AlertTypeEnumClass[alert.type],
      });
    });
  }


  //other
  private listenToManualTriggers() {
    if (this.manualTriggersSubscription) {
      this.manualTriggersSubscription.unsubscribe();
    }

    const manualTriggersArray = this.createGameForm.get('manualTriggers') as FormArray;
    this.manualTriggersSubscription = manualTriggersArray.valueChanges
      .pipe(
        startWith(manualTriggersArray.value) // Emit the current value immediately
      )
      .subscribe((manualTriggers) => {
        this.ManualTriggerSubject.next(manualTriggers);
      });
  }

  get userInfo(): UserInfo {
    return this.userInfoSubject.getValue();
  }

  get playerRole(): RoleEnum {
    return this.userInfo.role;
  }

}
