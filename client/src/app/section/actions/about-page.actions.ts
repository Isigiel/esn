import { createAction, props } from '@ngrx/store';

export const editAbout = createAction('[AboutPage] Edit About');
export const saveAbout = createAction(
  '[AboutPage] Save About',
  props<{ about: string }>(),
);
