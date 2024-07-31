import {Component, Input, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {copyToClipboard} from "../../shared/functions/global";
import {MatTooltip} from "@angular/material/tooltip";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {SignalRService} from "../../shared/services/signalr.service";
import {userInfo} from "node:os";
import {UserInfo} from "../../shared/models/classes/user-info";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatIcon,
    MatTooltip,
    MatToolbar,
    MatButton,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  @Input() parentComponent: string;
  showRoomId: boolean = false;
  userInfo: UserInfo;

  constructor(private service: SignalRService) {
  }

  ngOnInit(): void {
    this.listenToUserInfo();
  }

  listenToUserInfo() {
    this.service.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  }

  copyRoomId() {
    copyToClipboard(this.userInfo.roomId)
  }

  getHiddenRoomId(): string {
    return '*'.repeat(this.userInfo.roomId.length);
  }

  leaveRoom() {
    this.service.leaveRoom();
  }
}
