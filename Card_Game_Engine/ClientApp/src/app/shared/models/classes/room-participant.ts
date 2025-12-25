import {Player} from "../../../create-game/namespace/classes/player";
import {RoleEnum} from "../enums/role.enum";

export class RoomParticipant {
  userId: string;
  userName: string;
  isRoomOwner: boolean;
  role: RoleEnum;
  assignedPlayer?: Player;
}
