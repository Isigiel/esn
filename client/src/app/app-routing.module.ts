import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@esn/client/core/components/not-found.component';
import { PermissionGuard } from '@esn/client/auth/guards/permission.guard';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { LoginComponent } from '@esn/client/core/components/login.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./administration/administration.module').then(
        (m) => m.AdministrationModule,
      ),
    data: { permission: GlobalPermissions.ADMIN },
    canLoad: [PermissionGuard],
  },
  { path: 'login', component: LoginComponent, data: { title: 'Please wait' } },
  { path: '**', component: NotFoundComponent, data: { title: 'Not found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
