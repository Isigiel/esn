import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CreateInvitePageComponent,
  SectionsPageComponent,
} from '@esn/client/administration/containers';
import { ViewSectionPageComponent } from '@esn/client/administration/containers/view-section-page.component';
import { SectionExistsGuard } from '@esn/client/administration/guards/section-exists.guard';
import { SectionActions } from '@esn/client/administration/actions/idex';
import { GlobalPermissions } from '@esn/shared/global-permissions';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sections' },
  {
    path: 'sections',
    component: SectionsPageComponent,
    data: {
      title: 'Manage sections',
      action: {
        text: 'Create Section',
        icon: 'icon-add',
        permission: GlobalPermissions.ADMIN,
        dispatch: SectionActions.openSectionDialog(),
      },
    },
  },
  {
    path: 'sections/:id',
    canActivate: [SectionExistsGuard],
    data: { title: 'Section details' },
    component: ViewSectionPageComponent,
  },
  {
    path: 'sections/:id/invite',
    canActivate: [SectionExistsGuard],
    data: { title: 'Invite users' },
    component: CreateInvitePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
