import { createReducer, on } from '@ngrx/store';
import * as LayoutActions from '../actions/layout.actions';

export const layoutFeatureKey = 'layout';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,

  on(LayoutActions.loadLayouts, state => state),
);
