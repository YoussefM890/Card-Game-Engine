import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {gameJson} from "./dummy-rules";
import {SignalRService} from "../../shared/services/signalr.service";
import {ManualTrigger} from "../namespace/classes/manual-trigger";
import {DialogHeaderComponent} from "../../_reusable-components/dialog-header/dialog-header.component";

@Component({
  selector: 'app-import-rules',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    DialogHeaderComponent,
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
    // Clear existing form arrays without emitting events
    const playersArray = this.form.get('players') as FormArray;
    const rulesArray = this.form.get('rules') as FormArray;
    const startingDeckArray = this.form.get('startingDeck') as FormArray;
    const manualTriggersArray = this.form.get('manualTriggers') as FormArray;

    playersArray.clear({emitEvent: false});
    rulesArray.clear({emitEvent: false});
    startingDeckArray.clear({emitEvent: false});
    manualTriggersArray.clear({emitEvent: false});

    // Push new values without emitting events
    data.players.forEach(player => playersArray.push(this.createPlayerFormGroup(player), {emitEvent: false}));
    data.rules.forEach(rule => rulesArray.push(this.createRuleFormGroup(rule), {emitEvent: false}));
    data.startingDeck.forEach(card => startingDeckArray.push(this.createCardFormGroup(card), {emitEvent: false}));
    data.manualTriggers.forEach(trigger => manualTriggersArray.push(this.createManualTriggerFormGroup(trigger), {emitEvent: false}));

    // Set new values for simple form controls
    this.form.get('width').setValue(data.width);
    this.form.get('height').setValue(data.height);
    this.form.setControl('grid', this.fb.control(data.grid));

    // Emit a single event after all updates are complete
    playersArray.updateValueAndValidity({emitEvent: true});
    rulesArray.updateValueAndValidity({emitEvent: true});
    startingDeckArray.updateValueAndValidity({emitEvent: true});
    manualTriggersArray.updateValueAndValidity({emitEvent: true});
  }

  onSubmit() {
    this.updateForm(JSON.parse(this.gameJson));
    this.dialogRef.close();
  }

  // Step 1: Create a parameter FormGroup
  private createParameterFormGroup(parameter: any): FormGroup {
    return this.fb.group({
      id: parameter.id,
      value: [parameter.value]
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
  private createManualTriggerFormGroup(trigger: ManualTrigger): FormGroup {
    return this.fb.group({
      id: trigger.id,
      name: trigger.name,
      description: trigger.description,
      visibleTo: this.fb.array(trigger.visibleTo || []),
    });
  }

  // Create a player FormGroup
  private createPlayerFormGroup(player: any): FormGroup {
    return this.fb.group({
      id: player.id,
      role: player.role,
      description: player.description,
      perspective: player.perspective
    });
  }
}
