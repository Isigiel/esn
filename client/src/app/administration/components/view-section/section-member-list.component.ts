import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SectionMembership } from '@esn/client/core/models';

@Component({
  selector: 'esn-section-member-list',
  template: `
    <div fxLayout="row" fxLayoutAlign="space-between center">
      <div>
        <h3 style="margin: 0;">Current Members</h3>
        <small>Click a member to edit their permission</small>
      </div>
      <a mat-flat-button color="primary" routerLink="invite">
        <mat-icon svgIcon="icon-invite"></mat-icon>
        <span>Create Invite</span>
      </a>
    </div>
    <mat-action-list>
      <button
        mat-list-item
        *ngFor="let membership of members; trackBy: trackById"
        (click)="edit.emit(membership)"
      >
        <img matListAvatar [src]="membership.user.picture" />
        <h3 matLine>{{ membership.user.name }}</h3>
        <p matLine>
          <span>Permissions: {{ membership.permissions | json }} </span>
        </p>
      </button>
    </mat-action-list>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionMemberListComponent {
  @Input() members: SectionMembership[];
  @Output() edit = new EventEmitter<SectionMembership>();

  constructor() {}

  trackById(index, item) {
    return item.id;
  }
}
