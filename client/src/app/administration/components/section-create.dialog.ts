import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'esn-section-create',
  template: `
    <h2 mat-dialog-title>Create new Section</h2>
    <mat-dialog-content>
      <form [formGroup]="sectionForm" gdAuto gdColumns="1fr 1fr" gdGap="1rem">
        <mat-form-field>
          <mat-label>Section Name</mat-label>
          <input
            matInput
            placeholder="Section Name"
            formControlName="name"
            type="text"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>University</mat-label>
          <input
            matInput
            placeholder="University"
            formControlName="university"
            type="text"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Short code</mat-label>
          <input
            matInput
            placeholder="Short code"
            formControlName="shortCode"
            type="text"
          />
        </mat-form-field>
        <mat-form-field>
          <mat-label>ESN code</mat-label>
          <input
            matInput
            placeholder="ESN code"
            formControlName="esnCode"
            type="text"
          />
        </mat-form-field>
        <mat-form-field gdColumn="span 2">
          <mat-label>ESN id</mat-label>
          <input
            matInput
            placeholder="ESN id"
            formControlName="esnId"
            type="text"
          />
          <mat-hint
            >You can find the ESN info at
            <a href="https://accounts.esn.org/api/v1/sections"
              >https://accounts.esn.org/api/v1/sections</a
            ></mat-hint
          >
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-flat-button
        color="primary"
        [disabled]="sectionForm.invalid"
        [mat-dialog-close]="sectionForm.value"
      >
        Save
      </button>
      <button mat-dialog-close mat-flat-button color="warn">close</button>
    </mat-dialog-actions>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line:component-class-suffix
export class SectionCreateDialog {
  sectionForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.sectionForm = fb.group({
      name: ['', Validators.required],
      university: ['', Validators.required],
      shortCode: ['', Validators.required],
      esnId: ['', Validators.required],
      esnCode: ['', Validators.required],
    });
  }
}
