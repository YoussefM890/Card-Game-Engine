import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {playGameGuard} from './play-game.guard';

describe('playGameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => playGameGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
