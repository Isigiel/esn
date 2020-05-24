import { TestBed } from '@angular/core/testing';

import { SectionExistsGuard } from './section-exists.guard';

describe('SectionExistsGuard', () => {
  let guard: SectionExistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SectionExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
