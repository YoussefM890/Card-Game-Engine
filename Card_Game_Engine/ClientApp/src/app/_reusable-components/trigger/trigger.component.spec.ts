import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TriggerComponent} from './trigger.component';

describe('TriggerComponent', () => {
  let component: TriggerComponent;
  let fixture: ComponentFixture<TriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
