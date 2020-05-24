import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '@esn/client/core/services';
import { UserSearchActions } from '@esn/client/administration/actions/idex';
import { asyncScheduler, EMPTY, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { User } from '@esn/client/core/models';

@Injectable()
export class UserSearchEffects {
  search$ = createEffect(
    () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(UserSearchActions.searchUser),
        debounceTime(debounce, scheduler),
        switchMap(({ query }) => {
          if (query === '') {
            return EMPTY;
          }

          const nextSearch$ = this.actions$.pipe(
            ofType(UserSearchActions.searchUser),
            skip(1),
          );

          return this.userService.getWithQuery({ search: query }).pipe(
            takeUntil(nextSearch$),
            map((users: User[]) => UserSearchActions.searchSuccess({ users })),
            catchError(err =>
              of(UserSearchActions.searchFailure({ error: err.message })),
            ),
          );
        }),
      ),
  );
  constructor(private actions$: Actions, private userService: UserService) {}
}
