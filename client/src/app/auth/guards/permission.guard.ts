import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from '@esn/client/auth/reducers';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { first } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { AuthActions } from '@esn/client/auth/actions';
import { isAllowed } from '@esn/shared/checkPermisson';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private store: Store<fromAuth.State>,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    const permission = this.retrievePermission(next.data);
    if (!permission) {
      return true;
    }
    const loggedIn = await this.assureLogin(
      this.document.location.pathname ? this.document.location.pathname : '/',
    );
    if (!loggedIn) {
      return loggedIn;
    }
    return await this.checkPermission(permission);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    return this.canActivate(route, state);
  }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const permission = this.retrievePermission(route.data);
    if (!permission) {
      return true;
    }
    const loggedIn = await this.assureLogin(route.path);
    if (!loggedIn) {
      return loggedIn;
    }
    return await this.checkPermission(permission);
  }

  private retrievePermission(
    data,
  ): GlobalPermissions | SectionPermissions | null {
    const permission = data?.permission;
    if (!permission) {
      console.warn(
        'Permission guard called, but no permission attached to route',
      );
    }
    return permission;
  }

  private getTenant() {
    const [tenant, ...tail] = this.document.location.hostname.split('.');
    if (tenant === 'localhost') {
      return 'tumi';
    }
    return tenant;
  }

  private async checkPermission(
    permission: GlobalPermissions | SectionPermissions,
  ) {
    const user = await this.store
      .select(fromAuth.selectUser)
      .pipe(first())
      .toPromise();
    return isAllowed(
      [
        ...user.permissions,
        ...(user.memberships.find(
          (m) => m.section.shortCode === this.getTenant(),
        )?.permissions ?? []),
      ],
      permission,
    );
  }

  private async assureLogin(redirectPath = '/') {
    const status = await this.store
      .select(fromAuth.selectLoggedIn)
      .pipe(first())
      .toPromise();
    if (!status) {
      console.log('Not logged in, logging in with path: ', redirectPath);
      this.store.dispatch(AuthActions.startLogin({ redirectPath }));
    }
    return status;
  }
}
