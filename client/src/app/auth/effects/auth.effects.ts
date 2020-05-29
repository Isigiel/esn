import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '@esn/client/auth/services';
import { AuthActions } from '@esn/client/auth/actions';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';

const effectInitAction = '[AuthEffects]: Init';

@Injectable()
export class AuthEffects implements OnInitEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(effectInitAction),
      mergeMap(() => this.authService.isAuthenticated$),
      filter((authenticated) => authenticated),
      map(() => AuthActions.loginSuccessful({})),
    ),
  );
  startLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.startLogin),
        tap(({ redirectPath }) => this.authService.login(redirectPath)),
      ),
    { dispatch: false },
  );
  completeLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccessful),
      mergeMap(({ targetRoute }) =>
        this.http.get<any>('/api/self').pipe(
          tap(() => {
            if (targetRoute) {
              this.router.navigate([targetRoute]);
            }
          }),
        ),
      ),
      tap(console.log),
      map((user) => AuthActions.loginComplete({ user })),
    ),
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.authService.logout()),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngrxOnInitEffects(): Action {
    return { type: effectInitAction };
  }
}
