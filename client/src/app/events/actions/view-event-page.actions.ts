import { createAction, props } from '@ngrx/store';
import { EsnEvent } from '@esn/client/events/models';

export const selectEvent = createAction(
  '[View Event Page] Select Event',
  props<{ id: string }>(),
);

export const updateEvent = createAction(
  '[View Event Page] Update Event',
  props<{ id: string; changes: Partial<EsnEvent> }>(),
);
