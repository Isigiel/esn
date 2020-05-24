import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SectionEffects } from './section.effects';

describe('SectionEffects', () => {
  let actions$: Observable<any>;
  let effects: SectionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectionEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SectionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
