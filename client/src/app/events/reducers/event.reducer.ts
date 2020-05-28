import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EsnEvent } from '../models';
import {
  EventApiActions,
  ViewEventPageActions,
} from '@esn/client/events/actions';
import { compareAsc } from 'date-fns';

export const eventsFeatureKey = 'events';

export interface State extends EntityState<EsnEvent> {
  // additional entities state properties
  selectedEventId: string | null;
}

export function sortByStart(a: EsnEvent, b: EsnEvent): number {
  return compareAsc(a.start, b.start);
}

export const adapter: EntityAdapter<EsnEvent> = createEntityAdapter<EsnEvent>({
  sortComparer: sortByStart,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedEventId: null,
});

export const reducer = createReducer(
  initialState,
  on(EventApiActions.addEventSuccess, (state, action) =>
    adapter.addOne(action.event, state),
  ),
  // on(EventApiActions.upsertEvent, (state, action) =>
  //   adapter.upsertOne(action.event, state),
  // ),
  // on(EventApiActions.addEvents, (state, action) =>
  //   adapter.addMany(action.events, state),
  // ),
  on(EventApiActions.upsertEvents, (state, action) =>
    adapter.upsertMany(action.events, state),
  ),
  on(EventApiActions.updateEvent, (state, action) =>
    adapter.updateOne(action.event, state),
  ),
  // on(EventApiActions.updateEvents, (state, action) =>
  //   adapter.updateMany(action.events, state),
  // ),
  // on(EventApiActions.deleteEvent, (state, action) =>
  //   adapter.removeOne(action.id, state),
  // ),
  // on(EventApiActions.deleteEvents, (state, action) =>
  //   adapter.removeMany(action.ids, state),
  // ),
  // on(EventApiActions.loadEvents, (state, action) =>
  //   adapter.setAll(action.events, state),
  // ),
  // on(EventApiActions.clearEvents, (state) => adapter.removeAll(state)),
  on(ViewEventPageActions.selectEvent, (state, { id }) => ({
    ...state,
    selectedEventId: id,
  })),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectId = (state: State) => state.selectedEventId;
