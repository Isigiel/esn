import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { values } from 'lodash-es';
import { PublicationState } from '@esn/shared/publicationState';
import { EsnEvent } from '@esn/client/events/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'esn-manage-event',
  template: `
    <h2>Manage event</h2>
    <mat-form-field>
      <mat-label>Publication</mat-label>
      <mat-select [formControl]="stateControl">
        <mat-option *ngFor="let state of states" [value]="state">
          {{ state | titlecase }}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <button
      mat-flat-button
      color="primary"
      [disabled]="event.publicationState === stateControl.value"
      (click)="change.emit(stateControl.value)"
    >
      Save changes
    </button>
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
export class ManageEventComponent implements OnInit {
  states = values(PublicationState);
  stateControl = new FormControl();
  @Input() event: EsnEvent;
  @Output() change = new EventEmitter<PublicationState>();

  constructor() {}

  ngOnInit(): void {
    this.stateControl.reset(this.event.publicationState);
  }
}
