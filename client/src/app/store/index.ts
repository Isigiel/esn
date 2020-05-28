import {
  Action,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from '../core/reducers/layout.reducer';
import { InjectionToken } from '@angular/core';

export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute, // select the current route
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectCurrentRouteTitle = createSelector(
  selectRouteData,
  (data) => data?.title ?? '',
);

export const selectCurrentRouteAction = createSelector(
  selectRouteData,
  (data) => data?.action,
);
