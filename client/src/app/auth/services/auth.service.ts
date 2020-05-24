import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, concatMap, map, shareReplay } from 'rxjs/operators';
import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { Store } from '@ngrx/store';
import * as fromAuth from '@esn/client/auth/reducers';
import { AuthActions } from '@esn/client/auth/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: 'tumi.eu.auth0.com',
      client_id: 'EUl3355MBOGnOrMrJy4U7qMxrdU0pXcr',
      redirect_uri: `${window.location.origin}`,
      audience: 'esn.events',
    }),
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err)),
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback())),
  );
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
  );

  constructor(private store: Store<fromAuth.State>) {
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) =>
        from(client.getTokenSilently(options)),
      ),
    );
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath },
      });
    });
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: 'EUl3355MBOGnOrMrJy4U7qMxrdU0pXcr',
        returnTo: `${window.location.origin}`,
      });
    });
  }

  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        map(cbRes => cbRes.appState?.target ?? '/'),
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(targetRoute => {
        this.store.dispatch(AuthActions.loginSuccessful({ targetRoute }));
      });
    }
  }
}
