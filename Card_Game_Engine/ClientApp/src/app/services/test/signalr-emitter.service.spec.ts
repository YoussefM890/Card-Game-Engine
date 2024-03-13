import { TestBed } from '@angular/core/testing';

import { SignalrEmitterService } from '../signalr-emitter.service';

describe('SignalrEmitterService', () => {
  let service: SignalrEmitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrEmitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
