import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@esn/client/store';
import * as fromAuth from '@esn/client/auth/reducers';
import { Observable } from 'rxjs';
import { AuthActions } from '@esn/client/auth/actions';
import { Location } from '@angular/common';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionPermissions } from '@esn/shared/section-permissions';

@Component({
  selector: 'esn-navigation-sheet',
  templateUrl: './navigation-sheet.component.html',
  styleUrls: ['./navigation-sheet.component.scss'],
})
export class NavigationSheetComponent {
  loggedIn$: Observable<boolean>;
  routes = [
    {
      icon: 'icon-tear-off-calendar',
      text: 'Events',
      link: 'events',
      permission: '',
    },
    {
      icon: 'icon-home-page',
      text: 'About',
      link: 'section',
      permission: '',
    },
    {
      icon: 'icon-administrative-tools',
      text: 'Administration',
      link: 'admin',
      permission: SectionPermissions.SECTION_MANAGE,
    },
  ];

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
