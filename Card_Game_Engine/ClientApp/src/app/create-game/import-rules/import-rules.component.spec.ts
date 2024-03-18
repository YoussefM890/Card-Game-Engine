import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportRulesComponent} from './import-rules.component';

describe('ImportRulesComponent', () => {
  let component: ImportRulesComponent;
  let fixture: ComponentFixture<ImportRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportRulesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImportRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
