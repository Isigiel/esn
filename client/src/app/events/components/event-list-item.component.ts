import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EsnEvent } from '@esn/client/events/models';
import { SectionPermissions } from '@esn/shared/section-permissions';

@Component({
  selector: 'esn-event-list-item',
  template: ` <div fxLayout="row" fxLayoutGap=".5rem">
      <div fxFlex="grow" class="title">
        <div
          fxLayout="row"
          *esnWithPermission="tagPermission"
          style="margin-top: -.5rem;"
        >
          <div class="tag {{ event.publicationState }}">
            {{ event.publicationState }}
          </div>
        </div>
        <h3 class="break-words">{{ event.title }}</h3>
        <h4 class="mat-subheader">{{ event.start | date: 'shortTime' }}</h4>
      </div>
      <img fxFlex="80px" loading="lazy" [esnIconSrc]="event.icon" />
    </div>
    <!--    <div fxFlex="grow"></div>-->
    <p>
      {{ event.teaser }}
    </p>`,
  styles: [
    `
      :host {
        display: flex;
        padding: 1rem;
        border-radius: 1rem;
        border: gray 1px solid;
        cursor: pointer;
        flex-direction: column;
      }

      h3 {
        margin: 0;
        font-weight: bold;
      }

      h4 {
        padding: 0;
        margin: 0;
      }
      .title {
        margin: 0 0 0.5rem;
      }
      .tag {
        border-radius: 4px;
        font-size: small;
        padding: 0 4px;
      }
      .tag.draft {
        color: white;
        background: #b92b27;
      }
      .tag.internal {
        color: white;
        background: #1565c0;
      }
      .tag.public {
        display: none;
      }
      p {
        margin: 0;
        margin-top: 0.5rem;
        float: bottom;
      }

      img {
        width: 80px;
        height: 80px;
        float: right;
        margin-right: -0.5rem;
        margin-top: -0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListItemComponent {
  tagPermission = SectionPermissions.EVENTS_MANAGE;
  @Input() event: EsnEvent;

  constructor() {}
}
