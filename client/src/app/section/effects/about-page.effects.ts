import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AboutPageActions } from '@esn/client/section/actions';
import { mergeMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AboutPageEffects {
  editAbout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AboutPageActions.editAbout),
        tap(() => this.router.navigate(['section', 'edit'])),
      ),
    { dispatch: false },
  );

  saveAbout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AboutPageActions.saveAbout),
        mergeMap(({ about }) =>
          this.http.post('/api/section/about', { about }),
        ),
        tap(() => this.router.navigate(['section'])),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private http: HttpClient,
  ) {}
}
