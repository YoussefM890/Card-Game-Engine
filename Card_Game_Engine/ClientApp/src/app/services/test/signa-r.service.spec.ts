import { TestBed } from '@angular/core/testing';

import { SignaRService } from './signa-r.service';

describe('SignaRService', () => {
  let service: SignaRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignaRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
