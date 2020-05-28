import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CreateEsnEvent, EsnEvent } from '../models/event.model';

export const addEvent = createAction(
  '[Event/API] Add Event',
  props<{ event: CreateEsnEvent }>(),
);

export const addEventSuccess = createAction(
  '[Event/API] Add Event success',
  props<{ event: EsnEvent }>(),
);

export const upsertEvent = createAction(
  '[Event/API] Upsert Event',
  props<{ event: EsnEvent }>(),
);

export const addEvents = createAction(
  '[Event/API] Add Events',
  props<{ events: EsnEvent[] }>(),
);

export const loadEvents = createAction('[Event/API] Load Events');

export const upsertEvents = createAction(
  '[Event/API] Upsert Events',
  props<{ events: EsnEvent[] }>(),
);

export const updateEvent = createAction(
  '[Event/API] Update Event',
  props<{ event: Update<EsnEvent> }>(),
);

export const updateEvents = createAction(
  '[Event/API] Update Events',
  props<{ events: Update<EsnEvent>[] }>(),
);

export const deleteEvent = createAction(
  '[Event/API] Delete Event',
  props<{ id: string }>(),
);

export const deleteEvents = createAction(
  '[Event/API] Delete Events',
  props<{ ids: string[] }>(),
);

export const clearEvents = createAction('[Event/API] Clear Events');
