import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {rules} from "./dummy-rules";

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
  ],
  templateUrl: './import-rules.component.html',
  styleUrl: './import-rules.component.scss'
})
export class ImportRulesComponent {
  rules: string = rules;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ImportRulesComponent>,
              public fb: FormBuilder
  ) {
  }

  // Step 4: Main form creation function
  createDynamicForm(data: any): FormGroup {
    return this.fb.group({
      rules: this.fb.array(data.rules.map(rule => this.createRuleFormGroup(rule)))
    });

  }

  onSubmit() {
    this.dialogRef.close(this.createDynamicForm(JSON.parse(this.rules)));
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

  // Step 3: Create a rule FormGroup
  private createRuleFormGroup(rule: any): FormGroup {
    return this.fb.group({
      trigger: rule.trigger,
      actions: this.fb.array(rule.actions.map(action => this.createActionFormGroup(action))),
      parameters: this.fb.array(rule.parameters.map(param => this.createParameterFormGroup(param)))
    });
  }
}
