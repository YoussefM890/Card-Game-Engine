import {GridItem} from "./grid-item";
import {ManualTrigger} from "../../../create-game/namespace/classes/manual-trigger";
import {Player} from "../../../create-game/namespace/classes/player";

export interface UserPlayerAssignment {
  userId: string;
  userName: string;
  playerId: number | null;
  isRoomOwner: boolean;
}

export class Game {
  grid: GridItem[];
  width?: number
  height?: number
  players: Player[]
  manualTriggers?: ManualTrigger[]
  userAssignments?: UserPlayerAssignment[] // User-to-player assignments

  constructor(grid: GridItem[] = [], players: Player[] = [], width: number = 0, height: number = 0) {
    this.grid = grid;
    this.players = players;
    this.width = width;
    this.height = height;
    this.manualTriggers = [];
    this.userAssignments = [];
  }
}
