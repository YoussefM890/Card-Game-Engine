import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SignalRService} from "../../services/signalr.service";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Game, UserPlayerAssignment} from "../../../play-game/namespace/classes/game";

@Component({
  selector: 'app-player-role-display',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './player-role-display.component.html',
  styleUrl: './player-role-display.component.scss'
})
export class PlayerRoleDisplayComponent implements OnInit, OnDestroy {
  @Input() game: Game | null = null; // Game object as source of truth
  currentUserId: string | null = null;

  private gameSubscription?: Subscription;
  private userInfoSubscription?: Subscription;

  constructor(private signalrService: SignalRService) {
  }

  get userAssignments(): UserPlayerAssignment[] {
    return this.game?.userAssignments || [];
  }

  get assignedUsers(): UserPlayerAssignment[] {
    return this.userAssignments.filter(u => u.playerId !== null);
  }

  get spectatorCount(): number {
    return this.userAssignments.filter(u => u.playerId === null).length;
  }

  ngOnInit(): void {
    // Subscribe to connection ID from service
    this.userInfoSubscription = this.signalrService.connectionId$.subscribe(connectionId => {
      this.currentUserId = connectionId;
    });
  }

  ngOnDestroy(): void {
    this.gameSubscription?.unsubscribe();
    this.userInfoSubscription?.unsubscribe();
  }

  isCurrentUser(assignment: UserPlayerAssignment): boolean {
    return assignment.userId === this.currentUserId;
  }

  getPlayerForAssignment(assignment: UserPlayerAssignment): any {
    if (!assignment.playerId || !this.game?.players) return null;
    return this.game.players.find(p => p.id === assignment.playerId);
  }

  getPlayerScore(assignment: UserPlayerAssignment): number {
    const player = this.getPlayerForAssignment(assignment);
    return player?.score || 0;
  }
}
