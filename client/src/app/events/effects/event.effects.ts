import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  EventActions,
  EventApiActions,
  ViewEventPageActions,
} from '@esn/client/events/actions';
import { exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { EventService } from '@esn/client/events/services/event.service';
import { omit } from 'lodash-es';

@Injectable()
export class EventEffects {
  createEvent$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventActions.beginCreation),
        exhaustMap(() => from(this.router.navigate(['/events/new']))),
      ),
    { dispatch: false },
  );

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventApiActions.addEvent),
      mergeMap(({ event }) => this.eventService.addOne(event)),
      map((event) => EventApiActions.addEventSuccess({ event })),
    ),
  );

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ViewEventPageActions.updateEvent),
      mergeMap((props) => this.eventService.update(props)),
      map((event) =>
        EventApiActions.updateEvent({
          event: { id: event.id, changes: omit(event, 'id') },
        }),
      ),
    ),
  );

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventApiActions.loadEvents),
      exhaustMap(() => this.eventService.findAll()),
      map((events) => EventApiActions.upsertEvents({ events })),
    ),
  );

  addEventSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EventApiActions.addEventSuccess),
        tap(({ event }) => this.router.navigate(['/events', event.id])),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private eventService: EventService,
  ) {}
}
