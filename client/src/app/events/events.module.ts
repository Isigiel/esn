import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import {
  CreateEventPageComponent,
  EventListPageComponent,
} from '@esn/client/events/containers';
import { SharedModule } from '@esn/client/shared';
import * as fromEvents from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EventEffects } from './effects/event.effects';
import { EventFormMainComponent } from '@esn/client/events/components';
import { ViewEventPageComponent } from './containers/view-event-page.component';
import { EventListComponent } from './components/event-list.component';
import { EventListItemComponent } from './components/event-list-item.component';
import { EventDetailsComponent } from './components/view-event/event-details.component';
import { ManageEventComponent } from './components/view-event/manage-event.component';

@NgModule({
  declarations: [
    EventListPageComponent,
    CreateEventPageComponent,
    EventFormMainComponent,
    ViewEventPageComponent,
    EventListComponent,
    EventListItemComponent,
    EventDetailsComponent,
    ManageEventComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromEvents.eventsFeatureKey, fromEvents.reducers),
    EffectsModule.forFeature([EventEffects]),
  ],
})
export class EventsModule {}
