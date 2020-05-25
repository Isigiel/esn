import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAuth from '@esn/client/auth/reducers';
import { DOCUMENT } from '@angular/common';
import { first, tap } from 'rxjs/operators';
import { AuthActions } from '@esn/client/auth/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private store: Store<fromAuth.State>,
    @Inject(DOCUMENT) private document: Document,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const redirectPath = this.document.location.pathname
      ? this.document.location.pathname
      : '/';
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      first(),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('Not logged in, logging in with path: ', redirectPath);
          this.store.dispatch(AuthActions.startLogin({ redirectPath }));
        }
      }),
    );
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
}
