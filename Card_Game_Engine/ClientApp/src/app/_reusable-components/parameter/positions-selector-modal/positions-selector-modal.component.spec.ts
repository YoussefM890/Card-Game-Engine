import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PositionsSelectorModalComponent} from './positions-selector-modal.component';

describe('PositionsSelectorModalComponent', () => {
  let component: PositionsSelectorModalComponent;
  let fixture: ComponentFixture<PositionsSelectorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionsSelectorModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PositionsSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
