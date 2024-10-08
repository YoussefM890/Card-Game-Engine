import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {gameJson} from "./dummy-rules";
import {clearFormArray} from "../../shared/functions/global";
import {MatToolbar} from "@angular/material/toolbar";
import {SignalRService} from "../../shared/services/signalr.service";

@Component({
  selector: 'app-import-rules',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatToolbar,
  ],
  templateUrl: './import-rules.component.html',
  styleUrls: ['./import-rules.component.scss']
})
export class ImportRulesComponent {
  gameJson: string = gameJson;
  form: FormGroup = this.service.createGameForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImportRulesComponent>,
    private fb: FormBuilder,
    private service: SignalRService
  ) {
  }

  // Step 4: Main form creation function
  updateForm(data: any) {
    // Clear existing form arrays
    clearFormArray(this.form.get('rules') as FormArray);
    clearFormArray(this.form.get('startingDeck') as FormArray);
    clearFormArray(this.form.get('manualTriggers') as FormArray);

    // Set new values for form arrays
    data.rules.forEach(rule => (this.form.get('rules') as FormArray).push(this.createRuleFormGroup(rule)));
    data.startingDeck.forEach(card => (this.form.get('startingDeck') as FormArray).push(this.createCardFormGroup(card)));
    data.manualTriggers.forEach(trigger => (this.form.get('manualTriggers') as FormArray).push(this.createManualTriggerFormGroup(trigger)));

    // Set new values for simple form controls
    this.form.get('width').setValue(data.width);
    this.form.get('height').setValue(data.height);
    this.form.get('grid').setValue(data.grid);
  }

  onSubmit() {
    this.updateForm(JSON.parse(this.gameJson));
    this.dialogRef.close();
  }

  // Step 1: Create a parameter FormGroup
  private createParameterFormGroup(parameter: any): FormGroup {
    return this.fb.group({
      id: parameter.id,
      value: parameter.value
    });
  }

  // Step 2: Create an action FormGroup
  private createActionFormGroup(action: any): FormGroup {
    return this.fb.group({
      id: action.id,
      parameters: this.fb.array(action.parameters.map(param => this.createParameterFormGroup(param)))
    });
  }

  // Step 3: Create a trigger FormGroup
  private createTriggerFormGroup(trigger: any): FormGroup {
    return this.fb.group({
      id: trigger.id,
      parameters: this.fb.array(trigger.parameters.map(param => this.createParameterFormGroup(param)))
    });
  }

  // Step 4: Create a rule FormGroup
  private createRuleFormGroup(rule: any): FormGroup {
    return this.fb.group({
      triggers: this.fb.array(rule.triggers.map(trigger => this.createTriggerFormGroup(trigger))),
      actions: this.fb.array(rule.actions.map(action => this.createActionFormGroup(action))),
      rules: this.fb.array(rule.rules.map(subRule => this.createRuleFormGroup(subRule)))
    });
  }

  // Create a card FormGroup
  private createCardFormGroup(card: any): FormGroup {
    return this.fb.group({
      value: card.value,
      suit: card.suit,
    });
  }

  // Create a manual trigger FormGroup
  private createManualTriggerFormGroup(trigger: any): FormGroup {
    return this.fb.group({
      id: trigger.id,
      name: trigger.name,
      description: trigger.description,
      visibility: trigger.visibility
    });
  }
}
