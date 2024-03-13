import { TestBed } from '@angular/core/testing';

import { SignalrListenerService } from '../signalr-listener.service';

describe('SignalrListenerService', () => {
  let service: SignalrListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
