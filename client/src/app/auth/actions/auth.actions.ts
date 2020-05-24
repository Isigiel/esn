import { createAction, props } from '@ngrx/store';
import { User } from '@esn/client/core/models';

export const loginComplete = createAction(
  '[Auth] Login complete',
  props<{ user: User }>(),
);

export const loginSuccessful = createAction(
  '[Auth] Login successful',
  props<{ targetRoute?: string }>(),
);

export const startLogin = createAction(
  '[Auth] start Login',
  props<{ redirectPath: string }>(),
);
export const logout = createAction('[Auth] Logout');
