import { createReducer, on } from '@ngrx/store';
import { UserSearchActions } from '@esn/client/administration/actions/idex';

export const userSearchFeatureKey = 'userSearch';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
}

export const initialState: State = {
  ids: [],
  loading: false,
  error: '',
};

export const reducer = createReducer(
  initialState,
  on(UserSearchActions.searchUser, (state, { query }) => {
    return query === ''
      ? {
          ids: [],
          loading: false,
          error: '',
        }
      : {
          ...state,
          loading: true,
          error: '',
        };
  }),
  on(UserSearchActions.searchSuccess, (state, { users }) => ({
    ids: users.map((user) => user.id),
    loading: false,
    error: '',
  })),
  on(UserSearchActions.searchFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const getIds = (state: State) => state.ids;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
