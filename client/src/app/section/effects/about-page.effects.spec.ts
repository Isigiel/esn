import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AboutPageEffects } from './about-page.effects';

describe('AboutPageEffects', () => {
  let actions$: Observable<any>;
  let effects: AboutPageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AboutPageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AboutPageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
