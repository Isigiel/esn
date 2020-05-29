import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SectionsPageComponent } from './containers/sections-page.component';
import { SectionListComponent } from './components/section-list.component';
import { SectionInfoComponent } from './components/section-info.component';
import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { SectionEffects } from './effects/section.effects';
import { SharedModule } from '@esn/client/shared';
import { SectionCreateDialog } from './components/section-create.dialog';
import { SectionListItemComponent } from './components/section-list-item.component';
import { ViewSectionPageComponent } from '@esn/client/administration/containers';
import { SectionMemberListComponent } from './components/section-member-list.component';
import { UserSearchComponent } from './components/user-search.component';
import { UserSearchEffects } from './effects/user-search.effects';
import { EditMembershipDialogComponent } from './components/edit-membership-dialog.component';
import { CreateInvitePageComponent } from '@esn/client/administration/containers';
import { CreateSectionFormComponent } from './components/create-section-form.component';

@NgModule({
  declarations: [
    SectionsPageComponent,
    SectionListComponent,
    SectionInfoComponent,
    SectionCreateDialog,
    SectionListItemComponent,
    ViewSectionPageComponent,
    SectionMemberListComponent,
    UserSearchComponent,
    EditMembershipDialogComponent,
    CreateInvitePageComponent,
    CreateSectionFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministrationRoutingModule,
    StoreModule.forFeature(
      fromAdmin.administrationFeatureKey,
      fromAdmin.reducers,
    ),
    EffectsModule.forFeature([SectionEffects, UserSearchEffects]),
  ],
})
export class AdministrationModule {}
