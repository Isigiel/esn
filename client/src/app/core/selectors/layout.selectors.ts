import { createFeatureSelector } from '@ngrx/store';
import * as fromLayout from '../reducers/layout.reducer';

export const selectLayoutState = createFeatureSelector<fromLayout.State>(
  fromLayout.layoutFeatureKey,
);
