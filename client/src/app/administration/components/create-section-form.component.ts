import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flatMap, mapKeys, mapValues, values } from 'lodash-es';
import { SectionPermissions } from '@esn/shared/section-permissions';

@Component({
  selector: 'esn-create-section-form',
  template: `
    <form
      [formGroup]="inviteForm"
      fxLayout="column"
      fxLayoutGap="1rem"
      (ngSubmit)="saveInvite()"
    >
      <h2>Prepare invitation</h2>
      <h3>Permissions to grant</h3>
      <div>
        <div
          fxLayout="row wrap"
          fxLayoutGap="1rem grid"
          formGroupName="permissions"
        >
          <mat-checkbox
            *ngFor="let permission of permissions"
            [formControlName]="permission"
            >{{ permission }}
          </mat-checkbox>
        </div>
        <p class="mat-caption">
          Granting no permissions just adds the user to your section as a member
        </p>
      </div>
      <div
        fxLayout="row"
        fxLayoutAlign="space-between center"
        fxLayoutGap="1rem"
      >
        <h3>Users to invite</h3>
        <button mat-stroked-button (click)="addEmail()">
          <mat-icon svgIcon="icon-add-user-female"></mat-icon>
          <span>Add user</span>
        </button>
      </div>
      <div gdAuto gdGap="0 1rem" gdColumns="auto 40px" formArrayName="emails">
        <ng-container *ngFor="let email of emails.controls; let i = index">
          <mat-form-field>
            <mat-label>Email {{ i }}</mat-label>
            <input matInput [formControlName]="i" type="email" required />
          </mat-form-field>
          <button
            mat-icon-button
            (click)="removeEmail(i)"
            style="margin-top: 10px;"
          >
            <mat-icon svgIcon="icon-remove-user-female"></mat-icon>
          </button>
        </ng-container>
      </div>
      <div fxLayout="row" fxLayoutGap=".5rem">
        <button
          mat-raised-button
          color="primary"
          [disabled]="inviteForm.invalid || emails.length == 0"
          type="submit"
        >
          Save
        </button>
        <a mat-stroked-button color="warn" routerLink="..">Cancel</a>
      </div>
    </form>
  `,
  styles: [
    `
      h2,
      h3,
      p {
        margin: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSectionFormComponent {
  inviteForm: FormGroup;
  permissions = values(SectionPermissions);
  @Output() save = new EventEmitter<{
    permissions: SectionPermissions[];
    emails: string[];
  }>();
  constructor(private fb: FormBuilder) {
    this.inviteForm = this.fb.group({
      permissions: this.fb.group(
        mapValues(
          mapKeys(SectionPermissions, (value) => value),
          [false],
        ),
      ),
      emails: this.fb.array([this.fb.control('', Validators.email)]),
    });
  }

  addEmail() {
    this.emails.push(this.fb.control('', Validators.email));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  get emails() {
    return this.inviteForm.get('emails') as FormArray;
  }

  saveInvite() {
    const invites = {
      ...this.inviteForm.value,
      permissions: flatMap(
        this.inviteForm.get('permissions').value,
        (assigned, permission) => (assigned ? [permission] : []),
      ),
    };
    this.save.emit(invites);
  }
}
