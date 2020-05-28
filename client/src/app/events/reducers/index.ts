import * as fromRoot from '@esn/client/store';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromEvent from './event.reducer';

export const eventsFeatureKey = 'events';

export interface EventssState {
  [fromEvent.eventsFeatureKey]: fromEvent.State;
}

export interface State extends fromRoot.State {
  [eventsFeatureKey]: EventssState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: EventssState | undefined, action: Action) {
  return combineReducers({
    [fromEvent.eventsFeatureKey]: fromEvent.reducer,
  })(state, action);
}

export const selectEventsState = createFeatureSelector<State, EventssState>(
  eventsFeatureKey,
);

export const selectEventEntitiesState = createSelector(
  selectEventsState,
  (state) => state[fromEvent.eventsFeatureKey],
);

export const selectSelectedEventId = createSelector(
  selectEventEntitiesState,
  fromEvent.selectId,
);

export const {
  selectIds: selectEventIds,
  selectEntities: selectEventEntities,
  selectAll: selectAllEvents,
  selectTotal: selectTotalEvents,
} = fromEvent.adapter.getSelectors(selectEventEntitiesState);

export const selectSelectedEvent = createSelector(
  selectEventEntities,
  selectSelectedEventId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);
