import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@esn/client/store';
import * as fromAuth from '@esn/client/auth/reducers';
import { Observable } from 'rxjs';
import { AuthActions } from '@esn/client/auth/actions';
import { Location } from '@angular/common';

@Component({
  selector: 'esn-navigation-sheet',
  templateUrl: './navigation-sheet.component.html',
  styleUrls: ['./navigation-sheet.component.scss'],
})
export class NavigationSheetComponent {
  loggedIn$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State & fromAuth.State>,
    private location: Location,
  ) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));
  }

  login() {
    this.store.dispatch(
      AuthActions.startLogin({
        redirectPath: this.location.path().length ? this.location.path() : '/',
      }),
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
