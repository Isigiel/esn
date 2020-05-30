import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@esn/client/core/components/not-found.component';
import { PermissionGuard } from '@esn/client/auth/guards/permission.guard';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { LoginComponent } from '@esn/client/core/components/login.component';
import { SectionPermissions } from '@esn/shared/section-permissions';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./administration/administration.module').then(
        (m) => m.AdministrationModule,
      ),
    data: { permission: SectionPermissions.SECTION_MANAGE },
    canLoad: [PermissionGuard],
  },
  { path: 'login', component: LoginComponent, data: { title: 'Please wait' } },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventsModule),
  },
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  { path: 'invite', loadChildren: () => import('./invite/invite.module').then(m => m.InviteModule) },
  { path: 'section', loadChildren: () => import('./section/section.module').then(m => m.SectionModule) },
  { path: '**', component: NotFoundComponent, data: { title: 'Not found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
