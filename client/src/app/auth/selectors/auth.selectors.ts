import { createFeatureSelector } from '@ngrx/store';
import * as fromAuth from '../reducers';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey,
);
