import {TestBed} from '@angular/core/testing';

import {PlayGameService} from '../play-game.service';

describe('PlayGameService', () => {
  let service: PlayGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
