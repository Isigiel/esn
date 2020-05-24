import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as LayoutActions from '../actions/layout.actions';

@Injectable()
export class LayoutEffects {
  loadLayouts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LayoutActions.loadLayouts),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY),
    );
  });

  constructor(private actions$: Actions) {}
}
