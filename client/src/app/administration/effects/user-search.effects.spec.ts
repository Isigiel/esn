import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserSearchEffects } from './user-search.effects';

describe('UserSearchEffects', () => {
  let actions$: Observable<any>;
  let effects: UserSearchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSearchEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UserSearchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
