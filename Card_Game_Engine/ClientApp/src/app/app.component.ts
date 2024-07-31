import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {GridComponent} from "./_reusable-components/grid/grid.component";
import {CreateGameComponent} from "./create-game/create-game.component";
import {HomeComponent} from "./home/home.component";
import {SignalRService} from "./shared/services/signalr.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCheckbox, ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatButton, MatInput, MatLabel, GridComponent, CreateGameComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ClientApp';

  constructor(private fb: FormBuilder,
              private signalRService: SignalRService,
  ) {
  }
  ngOnInit() {
    this.signalRService.startConnection();
  }
}
