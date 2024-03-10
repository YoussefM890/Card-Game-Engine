import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-add-edit-iteration-modal',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption
  ],
  templateUrl: './add-edit-iteration-modal.component.html',
  styleUrl: './add-edit-iteration-modal.component.scss'
})
export class AddEditIterationModalComponent {

}
