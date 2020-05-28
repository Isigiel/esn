import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import * as fromEvents from '@esn/client/events/reducers';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { ViewEventPageActions } from '@esn/client/events/actions';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { PublicationState } from '@esn/shared/publicationState';

@Component({
  selector: 'esn-view-event-page',
  template: `
    <div
      fxLayout="column"
      fxLayout.gt-sm="row"
      fxLayoutAlign.gt-sm="center start"
    >
      <esn-event-details [event]="event$ | ngrxPush"></esn-event-details>
      <esn-manage-event
        *esnWithPermission="managePermission"
        [event]="event$ | ngrxPush"
        (change)="updateEvent($event)"
      ></esn-manage-event>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEventPageComponent implements OnDestroy {
  event$;
  managePermission = SectionPermissions.EVENTS_MANAGE;
  private actionsSubscription: Subscription;

  constructor(private store: Store<fromEvents.State>, route: ActivatedRoute) {
    this.event$ = this.store.pipe(select(fromEvents.selectSelectedEvent));
    this.actionsSubscription = route.paramMap
      .pipe(
        map((params) =>
          ViewEventPageActions.selectEvent({ id: params.get('id') }),
        ),
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  async updateEvent(publicationState: PublicationState) {
    const { id } = await this.event$.pipe(first()).toPromise();
    this.store.dispatch(
      ViewEventPageActions.updateEvent({ id, changes: { publicationState } }),
    );
  }
}
