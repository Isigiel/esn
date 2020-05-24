import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectionMembership } from '@esn/client/core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { flatMap, keys, mapValues } from 'lodash-es';
import { SectionPermissions } from '@esn/shared/section-permissions';

@Component({
  selector: 'esn-edit-membership-dialog',
  template: `
    <h2 mat-dialog-title>
      Edit permissions for {{ data.membership.user.name }}
    </h2>
    <mat-dialog-content>
      <h3>Assigned Permissions</h3>
      <form [formGroup]="permissionForm" style="padding: 1rem 0;">
        <mat-checkbox
          *ngFor="let permission of permissions"
          [formControlName]="permission"
          >{{ permission }}</mat-checkbox
        >
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-flat-button [mat-dialog-close]="update" color="primary">
        Save
      </button>
      <button mat-flat-button mat-dialog-close>Cancel</button>
    </mat-dialog-actions>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMembershipDialogComponent {
  permissionForm: FormGroup;
  permissions = keys(SectionPermissions);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { membership: SectionMembership },
    fb: FormBuilder,
  ) {
    this.permissionForm = fb.group(
      mapValues(SectionPermissions, (_, perm: SectionPermissions) => [
        this.data.membership.permissions.includes(perm),
      ]),
    );
  }
  get update() {
    return {
      ...this.data.membership,
      permissions: flatMap(this.permissionForm.value, (assigned, permission) =>
        assigned ? [permission] : [],
      ),
    };
  }
}
