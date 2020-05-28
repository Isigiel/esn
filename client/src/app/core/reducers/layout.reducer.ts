import { createReducer } from '@ngrx/store';

export const layoutFeatureKey = 'layout';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(initialState);
