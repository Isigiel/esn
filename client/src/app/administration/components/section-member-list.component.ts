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
    <h3>Current Members</h3>
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
  styles: [],
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
