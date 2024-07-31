import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {createGameGuard} from './create-game.guard';

describe('createGameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => createGameGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
