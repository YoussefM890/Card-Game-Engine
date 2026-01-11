import {Component} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {SignalRService} from "../shared/services/signalr.service";
import {MatIcon} from "@angular/material/icon";
import {ThemeService} from "../shared/services/theme.service";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatIcon,
    MatMiniFabButton,
    MatTooltip,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  roomId: string = null;

  constructor(private service: SignalRService, public themeService: ThemeService) {
  }

  toggleTheme() {
    this.themeService.toggleTheme();
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
