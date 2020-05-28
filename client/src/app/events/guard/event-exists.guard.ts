import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import * as fromEvents from '@esn/client/events/reducers';
import { select, Store } from '@ngrx/store';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { EventService } from '@esn/client/events/services/event.service';
import { EventApiActions } from '@esn/client/events/actions';

@Injectable({
  providedIn: 'root',
})
export class EventExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromEvents.State>,
    private eventService: EventService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.hasEvent(next.paramMap.get('id'));
  }

  private hasEventInStore(id: string) {
    return this.store.pipe(
      select(fromEvents.selectEventEntities),
      map((entities) => !!entities[id]),
      first(),
    );
  }

  private hasEventInApi(id: string) {
    return this.eventService.findOne(id).pipe(
      map((event) => EventApiActions.addEventSuccess({ event })),
      tap((action) => this.store.dispatch(action)),
      map((event) => !!event),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      }),
    );
  }

  private hasEvent(id: string) {
    return this.hasEventInStore(id).pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasEventInApi(id);
      }),
    );
  }
}
