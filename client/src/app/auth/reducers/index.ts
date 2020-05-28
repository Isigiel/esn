import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromRoot from '@esn/client/store';
import * as fromAuth from '@esn/client/auth/reducers/auth.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.statusFeatureKey]: fromAuth.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(state: AuthState | undefined, action: Action) {
  return combineReducers({
    [fromAuth.statusFeatureKey]: fromAuth.reducer,
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey,
);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state) => state[fromAuth.statusFeatureKey],
);

export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser,
);
export const selectLoggedIn = createSelector(selectUser, (user) => !!user);
