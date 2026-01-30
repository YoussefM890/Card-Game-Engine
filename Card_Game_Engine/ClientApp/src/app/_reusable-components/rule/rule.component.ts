import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActionComponent} from "../action/action.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {TriggerComponent} from "../trigger/trigger.component";
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {RuleDragDropService} from './rule-drag-drop.service';
import {MatIcon} from "@angular/material/icon";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActionComponent,
    MatButton,
    MatIconButton,
    TriggerComponent,
    DragDropModule,
    MatIcon
  ],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.scss'
})
export class RuleComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() ruleForm: FormGroup;

  @ViewChild('triggerDropList') triggerDropList: CdkDropList;
  @ViewChild('actionDropList') actionDropList: CdkDropList;
  @ViewChild('ruleDropList') ruleDropList: CdkDropList;

  // Cached connected lists
  cachedTriggerLists: CdkDropList[] = [];
  cachedActionLists: CdkDropList[] = [];
  cachedRuleLists: CdkDropList[] = [];

  private listsSub: Subscription;

  constructor(
    private fb: FormBuilder,
    public dragDropService: RuleDragDropService,
    private cdr: ChangeDetectorRef
  ) {
  }

  get actions(): FormArray {
    return this.ruleForm.get('actions') as FormArray;
  }

  get triggers(): FormArray {
    return this.ruleForm.get('triggers') as FormArray;
  }

  get rules(): FormArray {
    return this.ruleForm.get('rules') as FormArray;
  }

  ngOnInit(): void {
    // Subscribe to list changes
    this.listsSub = this.dragDropService.listsChanged$.subscribe(() => {
      this.updateCachedLists();
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    // Register drop lists with the service after view init
    if (this.triggerDropList) {
      this.dragDropService.registerTriggerList(this.triggerDropList);
    }
    if (this.actionDropList) {
      this.dragDropService.registerActionList(this.actionDropList);
    }
    if (this.ruleDropList) {
      this.dragDropService.registerRuleList(this.ruleDropList);
    }
    // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.updateCachedLists();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    // Unregister drop lists when component is destroyed
    if (this.triggerDropList) {
      this.dragDropService.unregisterTriggerList(this.triggerDropList);
    }
    if (this.actionDropList) {
      this.dragDropService.unregisterActionList(this.actionDropList);
    }
    if (this.ruleDropList) {
      this.dragDropService.unregisterRuleList(this.ruleDropList);
    }
    if (this.listsSub) {
      this.listsSub.unsubscribe();
    }
  }

  updateCachedLists(): void {
    this.cachedTriggerLists = this.dragDropService.getTriggerLists().filter(list => list !== this.triggerDropList);
    this.cachedActionLists = this.dragDropService.getActionLists().filter(list => list !== this.actionDropList);
    this.cachedRuleLists = this.dragDropService.getRuleLists().filter(list => list !== this.ruleDropList);
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addTrigger() {
    const triggerForm = this.fb.group({
      id: [null, Validators.required],
      parameters: this.fb.array([])
    });
    this.triggers.push(triggerForm);
  }

  addInnerRule() {
    const ruleForm = this.fb.group({
      triggers: this.fb.array([]),
      rules: this.fb.array([]),
      actions: this.fb.array([])
    });
    this.rules.push(ruleForm);
  }

  addAction() {
    const actionForm = this.fb.group({
      id: [null, Validators.required],
      parameters: this.fb.array([])
    });
    this.actions.push(actionForm);
  }

  removeTrigger(index: number) {
    this.triggers.removeAt(index);
  }

  removeInnerRule(index: number) {
    this.rules.removeAt(index);
  }

  removeAction(index: number) {
    this.actions.removeAt(index);
  }

  duplicateTrigger(index: number) {
    const triggerToDuplicate = this.triggers.at(index);
    const duplicatedTrigger = this.fb.group({
      id: [triggerToDuplicate.value.id, Validators.required],
      parameters: this.fb.array(
        triggerToDuplicate.value.parameters.map((param: any) =>
          this.fb.group({
            id: [param.id, Validators.required],
            value: [param.value, Validators.required]
          })
        )
      )
    });
    this.triggers.insert(index + 1, duplicatedTrigger);
  }

  duplicateInnerRule(index: number) {
    const ruleToDuplicate = this.rules.at(index);
    const duplicatedRule = this.duplicateRuleRecursive(ruleToDuplicate.value);
    this.rules.insert(index + 1, duplicatedRule);
  }

  duplicateAction(index: number) {
    const actionToDuplicate = this.actions.at(index);
    const duplicatedAction = this.fb.group({
      id: [actionToDuplicate.value.id, Validators.required],
      parameters: this.fb.array(
        actionToDuplicate.value.parameters.map((param: any) =>
          this.fb.group({
            id: [param.id, Validators.required],
            value: [param.value, Validators.required]
          })
        )
      )
    });
    this.actions.insert(index + 1, duplicatedAction);
  }

  // Drag and drop handlers
  onTriggerDrop(event: CdkDragDrop<FormArray>) {
    if (event.previousContainer === event.container) {
      // Reorder within the same list
      moveItemInArray(
        event.container.data.controls,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Move between different lists
      const item = event.previousContainer.data.at(event.previousIndex);
      event.previousContainer.data.removeAt(event.previousIndex);
      event.container.data.insert(event.currentIndex, item);
    }
    // Update form validity
    event.container.data.updateValueAndValidity();
    if (event.previousContainer !== event.container) {
      event.previousContainer.data.updateValueAndValidity();
    }
  }

  onActionDrop(event: CdkDragDrop<FormArray>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.controls,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data.at(event.previousIndex);
      event.previousContainer.data.removeAt(event.previousIndex);
      event.container.data.insert(event.currentIndex, item);
    }
    event.container.data.updateValueAndValidity();
    if (event.previousContainer !== event.container) {
      event.previousContainer.data.updateValueAndValidity();
    }
  }

  onRuleDrop(event: CdkDragDrop<FormArray>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.controls,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data.at(event.previousIndex);
      event.previousContainer.data.removeAt(event.previousIndex);
      event.container.data.insert(event.currentIndex, item);
    }
    event.container.data.updateValueAndValidity();
    if (event.previousContainer !== event.container) {
      event.previousContainer.data.updateValueAndValidity();
    }

    // FIX: Force update connected lists after rule moves
    // This ensures nested rules can be moved to other locations
    setTimeout(() => {
      this.dragDropService.notifyChange();
    }, 0);
  }

  getConnectedTriggerLists(): CdkDropList[] {
    return this.cachedTriggerLists;
  }

  getConnectedActionLists(): CdkDropList[] {
    return this.cachedActionLists;
  }

  getConnectedRuleLists(): CdkDropList[] {
    // FIX: Always get fresh list during drag operation
    // This prevents stale connections when rules are nested
    return this.dragDropService.getRuleLists().filter(list => list !== this.ruleDropList);
  }

  private duplicateRuleRecursive(ruleValue: any): FormGroup {
    return this.fb.group({
      triggers: this.fb.array(
        (ruleValue.triggers || []).map((trigger: any) =>
          this.fb.group({
            id: [trigger.id, Validators.required],
            parameters: this.fb.array(
              (trigger.parameters || []).map((param: any) =>
                this.fb.group({
                  id: [param.id, Validators.required],
                  value: [param.value, Validators.required]
                })
              )
            )
          })
        )
      ),
      rules: this.fb.array(
        (ruleValue.rules || []).map((rule: any) => this.duplicateRuleRecursive(rule))
      ),
      actions: this.fb.array(
        (ruleValue.actions || []).map((action: any) =>
          this.fb.group({
            id: [action.id, Validators.required],
            parameters: this.fb.array(
              (action.parameters || []).map((param: any) =>
                this.fb.group({
                  id: [param.id, Validators.required],
                  value: [param.value, Validators.required]
                })
              )
            )
          })
        )
      )
    });
  }
}
