import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EsnEvent } from '@esn/client/events/models';

@Component({
  selector: 'esn-event-details',
  template: `
    <div
      fxLayout="row"
      class="title"
      fxLayoutAlign="start center"
      fxLayoutGap="1rem"
    >
      <div fxFlex="grow">
        <h1>{{ event.title }}</h1>
        <h3>
          {{ event.start | date: 'EEEE dd MMM HH:mm' }} -
          {{ event.end | date: 'dd MMM HH:mm' }}
        </h3>
      </div>
      <img [esnIconSrc]="event.icon" />
    </div>
    <markdown [data]="event.description"></markdown>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 1000px;
        padding: 1rem;
      }

      .title img {
        width: 100px;
        height: 100px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent {
  @Input() event: EsnEvent;

  constructor() {}
}
