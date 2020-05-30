import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { merge, Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'esn-event-form-main',
  template: `
    <div
      [formGroup]="form"
      gdAuto
      gdColumns.gt-md="repeat(4, 1fr)"
      gdColumns.gt-xs="repeat(2, 1fr)"
      gdColumns="1fr"
      gdGap="1rem"
    >
      <mat-form-field gdColumn.gt-xs="span 2">
        <mat-label>Event title</mat-label>
        <input matInput formControlName="title" type="text" />
      </mat-form-field>
      <div gdColumn.gt-xs="span 2" fxLayout="row" fxLayoutGap="1rem">
        <mat-form-field fxFlex="noshrink">
          <mat-label>Event icon</mat-label>
          <input matInput formControlName="icon" type="text" />
          <mat-hint>
            Read up on icons in the
            <a
              href="https://dev.azure.com/isigiel/esn.world/_wiki/wikis/esn.world-wiki/3/Event-Icons"
              target="_blank"
              >wiki</a
            >
          </mat-hint>
        </mat-form-field>
        <img
          fxFlex="64px"
          [esnIconSrc]="iconString$ | ngrxPush"
          height="64px"
          width="64px"
        />
      </div>
      <mat-form-field>
        <mat-label>Choose the starting date</mat-label>
        <input
          [matDatepicker]="startPicker"
          [max]="form.get('endDate').valueChanges | ngrxPush"
          formControlName="startDate"
          matInput
        />
        <mat-datepicker-toggle [for]="startPicker" matSuffix
          ><mat-icon matDatepickerToggleIcon svgIcon="icon-calendar"></mat-icon
        ></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Time your event starts</mat-label>
        <input formControlName="startTime" matInput />
        <mat-hint>Enter your time in <strong>24hr format</strong></mat-hint>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Choose the ending date</mat-label>
        <input
          [matDatepicker]="endPicker"
          [min]="form.get('startDate').valueChanges | ngrxPush"
          formControlName="endDate"
          matInput
        />
        <mat-datepicker-toggle [for]="endPicker" matSuffix
          ><mat-icon matDatepickerToggleIcon svgIcon="icon-calendar"></mat-icon
        ></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Time your event ends</mat-label>
        <input formControlName="endTime" matInput />
        <mat-hint>Enter your time in <strong>24hr format</strong></mat-hint>
      </mat-form-field>
      <mat-form-field gdColumn="1/-1">
        <mat-label>Event Teaser</mat-label>
        <input formControlName="teaser" matInput />
        <mat-hint>Short Text visible in the Event list</mat-hint>
      </mat-form-field>
      <mat-form-field gdColumn="1/-1">
        <mat-label>Event Description</mat-label>
        <textarea
          cdkTextareaAutosize
          cdkAutosizeMinRows="3"
          cdkAutosizeMaxRows="6"
          matInput
          formControlName="description"
        ></textarea>
      </mat-form-field>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormMainComponent implements OnInit {
  @Input() form: FormGroup;
  iconString$: Observable<string>;

  constructor() {}

  ngOnInit() {
    this.iconString$ = merge(
      this.form.get('icon').valueChanges,
      of(this.form.get('icon').value),
    ).pipe(debounceTime(300));
  }
}
