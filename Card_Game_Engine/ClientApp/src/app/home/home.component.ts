import {Component} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {SignalRService} from "../shared/services/signalr.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatDialogClose,
    MatToolbar,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  roomId: string = null;

  constructor(private service: SignalRService) {
  }

  createRoom() {
    this.service.createRoom()
  }

  joinRoom() {
    if (this.roomId) {
      this.service.joinRoom(this.roomId)
    }
  }
}
