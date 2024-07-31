import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomIdHeaderComponent} from './room-id-header.component';

describe('RoomIdHeaderComponent', () => {
  let component: RoomIdHeaderComponent;
  let fixture: ComponentFixture<RoomIdHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomIdHeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoomIdHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
