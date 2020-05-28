import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { set } from 'date-fns';
import { pick } from 'lodash-es';
import { Store } from '@ngrx/store';
import * as fromEvents from '../reducers';
import { EventApiActions } from '@esn/client/events/actions';

@Component({
  selector: 'esn-create-event-page',
  template: `
    <form
      [formGroup]="eventForm"
      fxLayout="column"
      fxLayoutGap="1rem"
      (ngSubmit)="saveEvent()"
    >
      <esn-event-form-main [form]="eventForm"></esn-event-form-main>
      <div fxLayout="row" fxLayoutGap="1rem">
        <button
          type="submit"
          mat-raised-button
          [disabled]="eventForm.invalid"
          color="primary"
        >
          Save Event
        </button>
        <button type="submit" mat-flat-button color="warn" routerLink="..">
          Cancel
        </button>
      </div>
    </form>
  `,
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
export class CreateEventPageComponent {
  eventForm: FormGroup;

  constructor(fb: FormBuilder, private store: Store<fromEvents.State>) {
    this.eventForm = fb.group({
      title: ['', Validators.required],
      icon: ['planner', Validators.required],
      description: ['', Validators.required],
      teaser: ['', Validators.required],
      startDate: [null, Validators.required],
      startTime: ['', Validators.pattern(/[0-2]\d:\d\d/)],
      endDate: [null, Validators.required],
      endTime: ['', Validators.pattern(/[0-2]\d:\d\d/)],
    });
  }

  saveEvent() {
    if (this.eventForm.invalid) {
      return;
    }
    const formValues = this.eventForm.value;
    const [startHour, startMinute] = formValues.startTime.split(':');
    const [endHour, endMinute] = formValues.endTime.split(':');
    const event = {
      ...pick(formValues, ['title', 'icon', 'teaser', 'description']),
      start: set(formValues.startDate, {
        hours: startHour,
        minutes: startMinute,
      }),
      end: set(formValues.endDate, {
        hours: endHour,
        minutes: endMinute,
      }),
    };
    this.store.dispatch(EventApiActions.addEvent({ event }));
  }
}
