import * as fromRoot from '@esn/client/store';
import * as fromSection from '@esn/client/administration/reducers/section.reducer';
import * as fromSearch from '@esn/client/administration/reducers/user-search.reducer';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export const administrationFeatureKey = 'admin';

export interface AdministrationState {
  [fromSection.sectionFeatureKey]: fromSection.State;
  [fromSearch.userSearchFeatureKey]: fromSearch.State;
}

export interface State extends fromRoot.State {
  [administrationFeatureKey]: AdministrationState;
}

export function reducers(
  state: AdministrationState | undefined,
  action: Action,
) {
  return combineReducers({
    [fromSection.sectionFeatureKey]: fromSection.reducer,
    [fromSearch.userSearchFeatureKey]: fromSearch.reducer,
  })(state, action);
}

export const selectAdministrationState = createFeatureSelector<
  State,
  AdministrationState
>(administrationFeatureKey);

export const selectSearchState = createSelector(
  selectAdministrationState,
  (state) => state[fromSearch.userSearchFeatureKey],
);
export const selectSearchUserIds = createSelector(
  selectSearchState,
  fromSearch.getIds,
);
export const selectSearchLoading = createSelector(
  selectSearchState,
  fromSearch.getLoading,
);
export const selectSearchError = createSelector(
  selectSearchState,
  fromSearch.getError,
);
