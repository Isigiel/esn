import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionComponent } from './containers/section.component';
import { SectionResolverService } from '@esn/client/section/services/section-resolver.service';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionActions } from '@esn/client/administration/actions/idex';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { AboutPageActions } from '@esn/client/section/actions';
import { EditAboutPageComponent } from '@esn/client/section/containers/edit-about-page.component';
import { PermissionGuard } from '@esn/client/auth/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: SectionComponent,
    resolve: { section: SectionResolverService },
    data: {
      title: 'About us',
      action: {
        text: 'Edit Page',
        icon: 'icon-edit-file',
        permission: SectionPermissions.SECTION_INFO,
        dispatch: AboutPageActions.editAbout(),
      },
    },
  },
  {
    path: 'edit',
    component: EditAboutPageComponent,
    resolve: { section: SectionResolverService },
    data: {
      title: 'Edit section',
      permission: SectionPermissions.SECTION_INFO,
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectionRoutingModule {}
