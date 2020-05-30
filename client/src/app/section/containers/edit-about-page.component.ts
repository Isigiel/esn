import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import * as fromRoot from '@esn/client/store';
import { Store } from '@ngrx/store';
import { AboutPageActions } from '@esn/client/section/actions';

@Component({
  selector: 'esn-edit-about-page',
  template: `
    <mat-form-field style="width: 100%;margin-bottom: 1rem;">
      <mat-label>About your section</mat-label>
      <textarea
        matInput
        [formControl]="aboutControl"
        cdkTextareaAutosize
        cdkAutosizeMinRows="30"
        cdkAutosizeMaxRows="150"
      ></textarea>
      <mat-hint
        >This text should be written in markdown, you can write your text with
        some help at
        <a href="https://stackedit.io/app" target="_blank"
          >StackEdit</a
        ></mat-hint
      >
    </mat-form-field>
    <button
      mat-raised-button
      color="primary"
      [disabled]="aboutControl.invalid"
      (click)="saveChanges()"
      style="margin-right: .5rem;"
    >
      Save Changes
    </button>
    <a routerLink=".." mat-stroked-button color="warn">Cancel</a>
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
export class EditAboutPageComponent {
  aboutControl: FormControl;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
  ) {
    this.aboutControl = new FormControl(
      this.route.snapshot.data.section.about,
      Validators.required,
    );
  }
  saveChanges() {
    this.store.dispatch(
      AboutPageActions.saveAbout({ about: this.aboutControl.value }),
    );
  }
}
