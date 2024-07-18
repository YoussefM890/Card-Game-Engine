import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEditManualTriggerComponent} from './add-edit-manual-trigger.component';

describe('AddEditManualTriggerComponent', () => {
  let component: AddEditManualTriggerComponent;
  let fixture: ComponentFixture<AddEditManualTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditManualTriggerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddEditManualTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
