import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EsnEvent } from '@esn/client/events/models';

@Component({
  selector: 'esn-event-list',
  template: `
    <div
      gdAuto
      gdColumns="repeat(auto-fit, minmax(350px, 1fr))"
      gdGap="1rem"
      *ngIf="events.length; else empty"
    >
      <ng-container *ngFor="let group of events">
        <h3 gdColumn="1/-1" style="margin: 0;">
          {{ group.date | date: 'mediumDate' }}
        </h3>
        <esn-event-list-item
          mat-ripple
          class="elevation"
          *ngFor="let event of group.events; trackBy: trackById"
          [event]="event"
          [routerLink]="event.id"
        ></esn-event-list-item>
      </ng-container>
    </div>
    <ng-template #empty>
      <div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="2rem">
        <img
          src="/assets/images/soon.svg"
          alt="soon"
          style="width: 30vmin; min-width: 200px"
        />
        <h2 style="width: 30vmin; min-width: 200px; text-align: center">
          Currently there are no events online, check back later please
        </h2>
      </div>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent {
  @Input() events: { date: Date; events: EsnEvent[] }[];

  constructor() {}

  trackById(index, item) {
    return item.id;
  }
}
