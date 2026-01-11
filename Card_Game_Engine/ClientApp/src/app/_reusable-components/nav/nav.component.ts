import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {copyToClipboard} from "../../shared/functions/global";
import {MatTooltip} from "@angular/material/tooltip";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {SignalRService} from "../../shared/services/signalr.service";
import {UserInfo} from "../../shared/models/classes/user-info";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {GuideComponent} from "../../guide/guide.component";
import {ThemeService} from "../../shared/services/theme.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatIcon,
    MatTooltip,
    MatToolbar,
    MatButton,
    RouterLink,
    MatMiniFabButton
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit, OnDestroy {
  userInfoSubscription: Subscription
  @Input() parentComponent: string;
  showRoomId: boolean = false;
  userInfo: UserInfo;

  protected readonly MatTooltip = MatTooltip;

  ngOnInit(): void {
    this.listenToUserInfo();
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }

  listenToUserInfo() {
    this.userInfoSubscription = this.service.userInfo$.subscribe(userInfo => {
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

  constructor(
    private service: SignalRService,
    private dialog: MatDialog,
    public themeService: ThemeService
  ) {
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  openGuide() {
    this.dialog.open(GuideComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-dialog'
    });
  }
}
