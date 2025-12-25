import {RoomParticipant} from "./room-participant";
import {Player} from "../../../create-game/namespace/classes/player";

export class RoomState {
  roomId: string;
  participants: RoomParticipant[];
  availablePlayers: Player[];
}
