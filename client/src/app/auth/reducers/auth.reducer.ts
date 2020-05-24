import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '@esn/client/auth/actions';
import { User } from '@esn/client/core/models';

export const statusFeatureKey = 'status';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginComplete, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, () => initialState),
);

export const getUser = (state: State) => state.user;
