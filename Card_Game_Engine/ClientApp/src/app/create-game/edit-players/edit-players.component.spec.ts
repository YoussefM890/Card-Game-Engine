import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPlayersComponent} from './edit-players.component';

describe('EditPlayersComponent', () => {
  let component: EditPlayersComponent;
  let fixture: ComponentFixture<EditPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlayersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
