import {Component, Inject, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatList, MatListItem} from "@angular/material/list";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {VisibilityEnum} from "../namespace/enums/visibility.enum";
import {MatOption, MatSelect} from "@angular/material/select";
import {visibilityOptions} from '../namespace/constants/visibility-options';
import {MatIcon} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {recreateFormArray, validateForm} from "../../shared/functions/global";

@Component({
  selector: 'app-add-edit-button',
  standalone: true,
  imports: [
    MatToolbar,
    MatList,
    MatListItem,
    MatTable,
    ReactiveFormsModule,
    MatFormField,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatIcon,
    MatIconButton,
    MatDialogClose,
  ],
  templateUrl: './add-edit-manual-trigger.component.html',
  styleUrl: './add-edit-manual-trigger.component.scss'
})
export class AddEditManualTriggerComponent implements OnInit {
  form: FormGroup;
  displayedColumns: string[] = ['name', 'description', 'visibility', 'delete'];
  dataSource = []
  visibilityOptions = visibilityOptions.filter(option => option.value !== VisibilityEnum.Hidden)

  //add mad dialog data to constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddEditManualTriggerComponent>,
  ) {
  }

  get manualTriggersArray() {
    return this.form.get('manualTriggers') as FormArray;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      manualTriggers: this.fb.array([]),
    });
    recreateFormArray(this.manualTriggersArray, this.data.manualTriggers)
    this.dataSource = [...this.manualTriggersArray.controls]
    if (this.manualTriggersArray.length === 0) {
      this.addManualTrigger();
    }
  }

  addManualTrigger() {
    const length = this.manualTriggersArray.length;
    this.manualTriggersArray.push(this.fb.group({
      id: [-(length + 1), Validators.required],
      name: [null, Validators.required],
      description: [null],
      visibility: [VisibilityEnum.Visible, Validators.required],
    }));
    this.dataSource = [...this.manualTriggersArray.controls];
  }

  removeManualTrigger(index: number) {
    this.manualTriggersArray.removeAt(index);
    this.dataSource = [...this.manualTriggersArray.controls];
  }

  onSubmit() {
    if (!validateForm(this.form)) {
      return;
    }
    this.dialogRef.close(this.manualTriggersArray.value);
  }

}
