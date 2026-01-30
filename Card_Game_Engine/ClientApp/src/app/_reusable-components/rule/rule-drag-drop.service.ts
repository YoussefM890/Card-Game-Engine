import {Injectable} from '@angular/core';
import {CdkDropList} from '@angular/cdk/drag-drop';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleDragDropService {
  private triggerLists: CdkDropList[] = [];
  private actionLists: CdkDropList[] = [];
  private ruleLists: CdkDropList[] = [];

  private listsChangedSubject = new Subject<void>();
  listsChanged$ = this.listsChangedSubject.asObservable();

  registerTriggerList(list: CdkDropList): void {
    if (!this.triggerLists.includes(list)) {
      this.triggerLists.push(list);
      this.notifyChange();
    }
  }

  unregisterTriggerList(list: CdkDropList): void {
    const index = this.triggerLists.indexOf(list);
    if (index > -1) {
      this.triggerLists.splice(index, 1);
      this.notifyChange();
    }
  }

  registerActionList(list: CdkDropList): void {
    if (!this.actionLists.includes(list)) {
      this.actionLists.push(list);
      this.notifyChange();
    }
  }

  unregisterActionList(list: CdkDropList): void {
    const index = this.actionLists.indexOf(list);
    if (index > -1) {
      this.actionLists.splice(index, 1);
      this.notifyChange();
    }
  }

  registerRuleList(list: CdkDropList): void {
    if (!this.ruleLists.includes(list)) {
      this.ruleLists.push(list);
      this.notifyChange();
    }
  }

  unregisterRuleList(list: CdkDropList): void {
    const index = this.ruleLists.indexOf(list);
    if (index > -1) {
      this.ruleLists.splice(index, 1);
      this.notifyChange();
    }
  }

  getTriggerLists(): CdkDropList[] {
    return this.triggerLists;
  }

  getActionLists(): CdkDropList[] {
    return this.actionLists;
  }

  getRuleLists(): CdkDropList[] {
    return this.ruleLists;
  }

  // Changed from private to public so components can manually trigger updates
  notifyChange(): void {
    this.listsChangedSubject.next();
  }
}
