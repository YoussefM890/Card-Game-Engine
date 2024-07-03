import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Parameter} from "../../models/classes/parameter";

@Component({
  selector: 'app-parameter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatIconButton,
    MatLabel,
    MatIcon
  ],
  templateUrl: './parameter.component.html',
  styleUrl: './parameter.component.scss'
})
export class ParameterComponent implements OnInit {
  @Input() parameterForm: FormGroup;
  @Input() availableParameters: Parameter[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}

