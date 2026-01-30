import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {SignalRService} from "../../services/signalr.service";
import {RoomState} from "../../models/classes/room-state";
import {RoomParticipant} from "../../models/classes/room-participant";
import {Player} from "../../../create-game/namespace/classes/player";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatDividerModule} from "@angular/material/divider";
import {DialogHeaderComponent} from "../../../_reusable-components/dialog-header/dialog-header.component";

@Component({
  selector: 'app-player-assignment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatDividerModule,
    DialogHeaderComponent
  ],
  templateUrl: './player-assignment-dialog.component.html',
  styleUrl: './player-assignment-dialog.component.scss'
})

export class PlayerAssignmentDialogComponent implements OnInit {
  roomState: RoomState | null = null;
  participants: RoomParticipant[] = [];
  allPlayers: Player[] = [];

  // Simple: Just store current assignments in local state
  userAssignments: Map<string, number | null> = new Map();

  constructor(
    public dialogRef: MatDialogRef<PlayerAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private signalrService: SignalRService
  ) {
  }

  ngOnInit(): void {
    this.signalrService.roomState$.subscribe(roomState => {
      if (roomState) {
        this.roomState = roomState;
        this.participants = roomState.participants;

        // Get ALL players (available + assigned)
        this.allPlayers = this.getAllPlayers(roomState);

        // Initialize local assignments from current state
        if (this.userAssignments.size === 0) {
          roomState.participants.forEach(p => {
            this.userAssignments.set(p.userId, p.assignedPlayer?.id || null);
          });
        }
      }
    });
  }

  getAllPlayers(roomState: RoomState): Player[] {
    const players: Player[] = [];
    const playerIds = new Set<number>();

    // Add available players
    roomState.availablePlayers.forEach(player => {
      if (!playerIds.has(player.id)) {
        players.push(player);
        playerIds.add(player.id);
      }
    });

    // Add assigned players
    roomState.participants.forEach(participant => {
      if (participant.assignedPlayer && !playerIds.has(participant.assignedPlayer.id)) {
        players.push(participant.assignedPlayer);
        playerIds.add(participant.assignedPlayer.id);
      }
    });

    return players.sort((a, b) => a.id - b.id);
  }

  onAssignmentChange(userId: string, playerId: number | null): void {
    // Just update local state
    this.userAssignments.set(userId, playerId);
  }

  getAssignment(userId: string): number | null {
    return this.userAssignments.get(userId) || null;
  }

  getAvailablePlayersForUser(userId: string): Player[] {
    // Show all players EXCEPT those assigned to OTHER users
    const myAssignment = this.userAssignments.get(userId);

    return this.allPlayers.filter(player => {
      // If I have this player, show it
      if (myAssignment === player.id) {
        return true;
      }

      // Check if any OTHER user has this player
      for (const [otherUserId, assignedPlayerId] of this.userAssignments.entries()) {
        if (otherUserId !== userId && assignedPlayerId === player.id) {
          return false; // Another user has it, don't show
        }
      }

      return true; // Available
    });
  }

  getAssignedCount(): number {
    let count = 0;
    for (const playerId of this.userAssignments.values()) {
      if (playerId !== null) count++;
    }
    return count;
  }

  getSpectatorCount(): number {
    return this.participants.length - this.getAssignedCount();
  }

  onSave(): void {
    // Send all assignments to backend
    for (const [userId, playerId] of this.userAssignments.entries()) {
      if (playerId === null) {
        this.signalrService.unassignPlayerFromUser(userId);
      } else {
        this.signalrService.assignPlayerToUser(userId, playerId);
      }
    }

    this.dialogRef.close('saved');
  }

  onCancel(): void {
    this.dialogRef.close('cancelled');
  }
}
