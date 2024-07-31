import {RoleEnum} from "../enums/role.enum";

export class UserInfo {
  roomId: string;
  role: RoleEnum;
  isRoomOwner: boolean;
}
