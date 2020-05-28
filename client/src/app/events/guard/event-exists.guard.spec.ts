import { TestBed } from '@angular/core/testing';

import { EventExistsGuard } from './event-exists.guard';

describe('EventExistsGuard', () => {
  let guard: EventExistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EventExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
