import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReferenceEnum} from "./_namespace/enums/reference.enum";
import {ValueTypeEnum} from "./_namespace/enums/value-type.enum";
import {FilterTemplate} from "./_namespace/classes/filter";
import {SelectOption} from "../../../shared/models/classes/select-option";
import {Operator} from "./_namespace/classes/operator";
import {FilterCondition} from "./_namespace/classes/filter-condition";
import {filterConditions} from "./_namespace/constants/filter-conditions";
import {MatTooltip} from "@angular/material/tooltip";
import {NgTemplateOutlet} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {isNullUndefinedOrEmpty, JsonToForm} from "../../../shared/functions/global";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {filters} from "./_namespace/constants/filters";
import {LogicalOperatorEnum} from "./_namespace/enums/logical-operator.enum";
import {FilterGroup} from "./_namespace/classes/filter-group";

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatTooltip,
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss'
})
export class FilterModalComponent implements OnInit, OnDestroy {
  filterTemplate: FilterTemplate;
  filterForm: FormGroup;
  logicalOperatorEnum = LogicalOperatorEnum;
  isFilterSubmitted = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FilterModalComponent>,
              private fb: FormBuilder) {
    this.filterTemplate = filters[data.filterType]
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    if (!this.isFilterSubmitted) {
      this.dialogRef.close(this.data.filter)
    }
  }

  createForm() {
    const filterObject = this.deserializeFilter(this.data.filter)
    this.filterForm = filterObject ? JsonToForm(filterObject) : this.createGroup()
  }

  createGroup(): FormGroup {
    return this.fb.group({
      logicalOperator: [null],
      children: this.fb.array([this.createCondition()])
    });
  }

  createCondition(): FormGroup {
    return this.fb.group({
      id: [null],
      operator: [null],
      value: [null],
      logicalOperator: [null]
    });
  }

  addCondition(group: FormGroup) {
    const children = group.get('children') as FormArray;
    children.push(this.createCondition());
  }

  addGroup(group: FormGroup) {
    const children = group.get('children') as FormArray;
    children.push(this.createGroup());
  }

  getOperators(referenceId: ReferenceEnum): Operator[] {
    const condition = filterConditions[referenceId];
    return condition ? condition.operators : [];
  }

  isSelectValue(referenceId: ReferenceEnum): boolean {
    const condition = filterConditions[referenceId];
    return condition ? condition.valueType === ValueTypeEnum.Select : false;
  }

  getValueOptions(referenceId: ReferenceEnum): SelectOption[] {
    const condition = filterConditions[referenceId];
    return condition ? condition.valueOptions || [] : [];
  }

  submit() {
    const serializedFilterList = this.serializeFilter(this.filterForm.value);
    this.isFilterSubmitted = true;
    this.dialogRef.close(serializedFilterList.join(','));
  }

  getChildren(group: FormGroup): FormArray {
    return group.get('children') as FormArray;
  }

  convertToFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  getGroupColor(depth: number): string {
    const colors = [
      '#f0f0f0',
      '#e0e0e0',
      '#d0d0d0',
      '#c0c0c0'];
    return colors[depth % colors.length];
  }

  removeGroup(group: AbstractControl, parentGroup: FormGroup) {
    const children = parentGroup.get('children') as FormArray;
    const index = children.controls.indexOf(group);
    if (index > -1) {
      children.removeAt(index);
    }
  }

  serializeFilter(node: any): string[] {
    const serializeNode = (node: any): string[] => {
      const result: string[] = [];

      if (node.children) { // Group node
        result.push('(');
        node.children.forEach((child) => {
          result.push(...serializeNode(child));
        });
        // Remove trailing logical operator from last child
        result.pop();
        result.push(')');
        result.push(node.logicalOperator);
      } else { // Leaf node
        result.push(node.id);
        result.push(node.operator);
        result.push(node.value);
        result.push(node.logicalOperator);
      }

      return result;
    };

    const serialized = serializeNode(node);
    // Remove trailing logical operator from the entire filter
    serialized.pop();
    return serialized;
  }

  deserializeFilter(filterString: string): FilterGroup {
    if (isNullUndefinedOrEmpty(filterString)) {
      return null;
    }
    const filterList = filterString.split(',');
    let curIndex = 1;
    const root = new FilterGroup()
    const stack = [root];
    while (stack && curIndex < filterList.length) {
      const curGroup = stack[stack.length - 1];
      const curChar = filterList[curIndex];
      if (curChar === '(') {
        const group = new FilterGroup()
        curGroup.children.push(group);
        stack.push(group);
      } else if (curChar === ')') {
        if (curIndex + 1 < filterList.length && filterList[curIndex + 1] != ')') {
          curGroup.logicalOperator = parseInt(filterList[curIndex + 1]);
          curIndex++;
        }
        stack.pop();
      } else {
        const node: FilterCondition = {
          id: parseInt(filterList[curIndex]),
          operator: parseInt(filterList[curIndex + 1]),
          value: filterList[curIndex + 2],
        }
        const hasLogicalOperator = filterList[curIndex + 3] !== ')';
        if (hasLogicalOperator) {
          node.logicalOperator = parseInt(filterList[curIndex + 3]);
          curIndex += 3;
        } else {
          node.logicalOperator = null;
          curIndex += 2;
        }
        curGroup.children.push(node);
      }
      curIndex++;
    }
    if (stack.length > 0 || root.children.length == 0) {
      console.error("Invalid filter string");
      return null;
    }
    return root;
  }

}
