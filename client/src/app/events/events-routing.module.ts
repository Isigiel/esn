import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventListPageComponent } from '@esn/client/events/containers/event-list-page.component';
import { EventActions } from '@esn/client/events/actions';
import { CreateEventPageComponent } from '@esn/client/events/containers/create-event-page.component';
import { ViewEventPageComponent } from '@esn/client/events/containers/view-event-page.component';
import { EventExistsGuard } from '@esn/client/events/guard/event-exists.guard';
import { SectionPermissions } from '@esn/shared/section-permissions';

const routes: Routes = [
  {
    path: '',
    component: EventListPageComponent,
    data: {
      title: 'Events',
      action: {
        text: 'New event',
        icon: 'icon-add',
        permission: SectionPermissions.EVENTS_MANAGE,
        dispatch: EventActions.beginCreation(),
      },
    },
  },
  {
    path: 'new',
    component: CreateEventPageComponent,
    data: {
      title: 'New Event',
    },
  },
  {
    path: ':id',
    component: ViewEventPageComponent,
    canActivate: [EventExistsGuard],
    data: {
      title: 'Event details',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
