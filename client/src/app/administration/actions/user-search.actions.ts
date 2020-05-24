import { createAction, props } from '@ngrx/store';
import { User } from '@esn/client/core/models';

export const searchUser = createAction(
  '[UserSearch] Search user',
  props<{ query: string }>(),
);

export const searchSuccess = createAction(
  '[UserSearch] Search success',
  props<{ users: User[] }>(),
);

export const searchFailure = createAction(
  '[UserSearch] Search failure',
  props<{ error: string }>(),
);
