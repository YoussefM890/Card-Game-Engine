import {RoleEnum} from "../../../shared/models/enums/role.enum";

export class User {
  Id: string;
  IsRoomOwner: boolean;
  Name: string;
  Role: RoleEnum;
  JoinedAt: Date;

  constructor(id: string, isRoomOwner: boolean, name: string, role: RoleEnum) {
    this.Id = id;
    this.IsRoomOwner = isRoomOwner;
    this.Name = name;
    this.Role = role;
    this.JoinedAt = new Date();
  }
}
