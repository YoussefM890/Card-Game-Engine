import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIterationModalComponent } from './add-edit-iteration-modal.component';

describe('AddEditIterationModalComponent', () => {
  let component: AddEditIterationModalComponent;
  let fixture: ComponentFixture<AddEditIterationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditIterationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditIterationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
