import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {recreateFormArray, validateForm} from "../../shared/functions/global";
import {AddEditManualTriggerComponent} from "../add-edit-manual-trigger/add-edit-manual-trigger.component";
import {PerspectiveEnum} from "../namespace/enums/perspective.enum";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {perspectiveOptions} from "../namespace/constants/perspective-options";
import {DialogHeaderComponent} from "../../_reusable-components/dialog-header/dialog-header.component";

@Component({
  selector: 'app-edit-players',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    ReactiveFormsModule,
    MatHeaderCellDef,
    DialogHeaderComponent
  ],
  templateUrl: './edit-players.component.html',
  styleUrl: './edit-players.component.scss'
})
export class EditPlayersComponent {
  form: FormGroup;
  displayedColumns: string[] = ['role', 'description', 'side', 'delete'];
  dataSource = []
  perspectiveOptions = perspectiveOptions;
  usedIds: number[] = [];

  //add mad dialog data to constructor
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddEditManualTriggerComponent>,
  ) {
  }

  get playersArray() {
    return this.form.get('players') as FormArray;
  }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      players: this.fb.array([]),
    });
    this.usedIds = this.data.players.map((player: any) => player.id);
    recreateFormArray(this.playersArray, this.data.players)
    this.dataSource = [...this.playersArray.controls]
    if (this.playersArray.length === 0) {
      this.addPlayer();
    }
  }

  addPlayer() {
    const length = this.playersArray.length;
    const nextId = this.usedIds.length > 0 ? Math.max(...this.usedIds.map(id => Math.abs(id))) + 1 : 1;
    this.usedIds.push(nextId);
    this.playersArray.push(this.fb.group({
      id: [-nextId, [Validators.required]],
      role: ['Player ' + (length + 1), [Validators.required]],
      description: [null],
      perspective: [this.getDefaultPerspective(), [Validators.required]],
    }));
    this.dataSource = [...this.playersArray.controls];
  }

  removePlayer(index: number) {
    this.playersArray.removeAt(index);
    this.dataSource = [...this.playersArray.controls];
  }

  onSubmit() {
    if (!validateForm(this.form)) {
      return;
    }
    this.dialogRef.close(this.playersArray.value);
  }

  private getDefaultPerspective(): PerspectiveEnum {
    const balance = this.playersArray.controls.reduce((acc, control) => {
      const value = control.get('perspective')?.value;
      if (value === PerspectiveEnum.Bottom) return acc + 1;
      if (value === PerspectiveEnum.Top) return acc - 1;
      return acc;
    }, 0);

    // Prioritize Bottom if balance is 0 or more
    return balance <= 0 ? PerspectiveEnum.Bottom : PerspectiveEnum.Top;
  }
}
