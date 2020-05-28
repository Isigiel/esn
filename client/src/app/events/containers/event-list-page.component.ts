import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as fromEvents from '@esn/client/events/reducers';
import { select, Store } from '@ngrx/store';
import { EventApiActions } from '@esn/client/events/actions';
import { map } from 'rxjs/operators';
import { groupBy, keys } from 'lodash-es';
import { format, parse } from 'date-fns';

@Component({
  selector: 'esn-event-list-page',
  template: ` <esn-event-list [events]="events$ | ngrxPush"></esn-event-list>`,
  styles: [
    `
      :host {
        display: block;
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListPageComponent {
  events$;

  constructor(private store: Store<fromEvents.State>) {
    this.store.dispatch(EventApiActions.loadEvents());
    this.events$ = this.store.pipe(
      select(fromEvents.selectAllEvents),
      map((events) =>
        groupBy(events, (event) => format(event.start, 'yyyyDDD')),
      ),
      map((dateGroup) =>
        keys(dateGroup).map((date) => ({
          date: parse(date, 'yyyyDDD', new Date()),
          events: dateGroup[date],
        })),
      ),
    );
  }
}
