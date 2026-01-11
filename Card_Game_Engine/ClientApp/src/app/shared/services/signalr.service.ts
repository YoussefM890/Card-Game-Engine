import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {BehaviorSubject, startWith, Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
import {PerspectiveEnum, RotationsNeeded} from "../../create-game/namespace/enums/perspective.enum";
import {Player} from "../../create-game/namespace/classes/player";
import {User} from "../../play-game/namespace/classes/user";
import {RoomState} from "../models/classes/room-state";
import {rotateGrid} from "./signalr.functions";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private baseUrl: string;
  private hubConnection: signalR.HubConnection;

  private gameSubject = new BehaviorSubject<PlayGame>(new PlayGame());
  private ManualTriggerSubject = new BehaviorSubject<ManualTrigger[]>([]);
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
  public createGameForm: FormGroup;
  private PlayersSubject = new BehaviorSubject<Player[]>([]);
  public Players$ = this.PlayersSubject.asObservable();
  private UsersSubject = new BehaviorSubject<User[]>([]);
  public userInfo$ = this.userInfoSubject.asObservable();
  public Users$ = this.UsersSubject.asObservable();
  private roomStateSubject = new BehaviorSubject<RoomState | null>(null);
  public roomState$ = this.roomStateSubject.asObservable();
  private connectionIdSubject = new BehaviorSubject<string | null>(null);

  private manualTriggersSubscription: Subscription;
  public connectionId$ = this.connectionIdSubject.asObservable();
  private playersSubscription: Subscription;

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
        // Get and store connection ID
        this.getConnectionId();

        this.userConnectedListener();
        this.receiveMessageListener();
        this.receiveGameObjectListener();
        this.receiveUserInfoListener();
        this.receiveErrorMessageListener();
        this.userJoinedRoomListener();
        this.userLeftRoomListener();
        this.receiveAlertListener();
        this.receiveUsersListener();
        this.receiveRoomStateListener();

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

  public createGame(game: CreateGame) {
    console.log('Creating game:', game);
    this.hubConnection.invoke('CreateGame', game);
  }

  public invokeExplicitAction(action: Action) {
    this.hubConnection.invoke('InvokeExplicitAction', action);
  }

  // Methods to invoke server-side player assignment
  public assignPlayerToUser(userId: string, playerId: number) {
    this.hubConnection.invoke('AssignPlayerToUser', userId, playerId);
  }

  public unassignPlayerFromUser(userId: string) {
    this.hubConnection.invoke('UnassignPlayerFromUser', userId);
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

  private buildCreateGameForm() {
    this.createGameForm = this.fb.group({
      rules: this.fb.array([]),
      width: 9,
      height: 5,
      startingDeck: this.fb.array([]),
      grid: {},
      manualTriggers: this.fb.array([]),
      players: this.fb.array([this.buildDefaultPlayer()]),
    });
    // this.createGameForm = JsonToForm(defaultGameObject);
    this.listenToPlayers();
    this.listenToManualTriggers();
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

  private buildDefaultPlayer(): FormGroup {
    return this.fb.group({
      id: [-1, [Validators.required]],
      role: ["Player 1", [Validators.required]],
      description: [null],
      perspective: [PerspectiveEnum.Bottom, [Validators.required]],
    });
  }

  private receiveGameObjectListener = () => {
    this.hubConnection.on('ReceiveGameObject', (gameObject: PlayGame) => {
      console.log('Received game object:', gameObject);
      // Transform grid based on player's perspective
      const myAssignment = gameObject.userAssignments.find(a => a.userId === this.connectionIdSubject.value);
      if (myAssignment?.playerId !== null && myAssignment?.playerId !== undefined) {
        const myPlayer = gameObject.players.find(p => p.id === myAssignment.playerId);
        if (myPlayer) {
          const rotations = RotationsNeeded[myPlayer.perspective] ?? 0;
          if (rotations > 0) {
            const rotated = rotateGrid(gameObject.grid, gameObject.height, gameObject.width, rotations);
            gameObject.grid = rotated.grid;
            gameObject.height = rotated.rows;
            gameObject.width = rotated.columns;
          }
        }
      }
      this.gameSubject.next(gameObject);
    });
  }

  private receiveUsersListener() {
    this.hubConnection.on('ReceiveUsers', (users: User[]) => {
      console.log('Received users:', users);
      this.UsersSubject.next(users);
    });
  }

  private receiveRoomStateListener() {
    this.hubConnection.on('ReceiveRoomState', (roomState: RoomState) => {
      console.log('Received room state:', roomState);
      this.roomStateSubject.next(roomState);
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


  //implicit player changes

  private listenToPlayers() {
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
    const playersArray = this.createGameForm.get('players') as FormArray;
    playersArray.valueChanges
      .pipe(
        startWith(playersArray.value) // Emit the current value immediately
      )
      .subscribe((players) => {
        this.PlayersSubject.next(players);
      });
  }

  get userInfo(): UserInfo {
    return this.userInfoSubject.getValue();
  }

  get playerRole(): RoleEnum {
    return this.userInfo.role;
  }

  private getConnectionId(): void {
    this.hubConnection.invoke('GetConnectionId')
      .then((connectionId: string) => {
        this.connectionIdSubject.next(connectionId);
      })
      .catch(err => console.error('Error getting connection ID: ' + err));
  }

}
