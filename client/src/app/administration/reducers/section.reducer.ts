import { createReducer } from '@ngrx/store';

export const sectionFeatureKey = 'section';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(initialState);
