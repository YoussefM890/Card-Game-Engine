import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {SignalRService} from "./services/signa-r.service";
import {GridComponent} from "./grid/grid.component";
import {CreateGameComponent} from "./create-game/create-game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCheckbox, ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatButton, MatInput, MatLabel, GridComponent, CreateGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ClientApp';
  gameStartRulesForm: FormGroup;

  constructor(private fb: FormBuilder, public signalRService: SignalRService) {
    this.gameStartRulesForm = this.fb.group({
      shuffleDeck: [true],
      numberOfCardsToDeal: [''],
      dealMethod: [''],
      directionOfDealing: [''],
      equalCardsToAllPlayers: ['']
    });
  }
  ngOnInit() {
    this.signalRService.startConnection();
  }

  submitForm() {
    console.log(this.gameStartRulesForm.value);
  }
}
