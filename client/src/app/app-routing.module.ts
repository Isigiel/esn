import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@esn/client/core/components/not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./administration/administration.module').then(
        m => m.AdministrationModule,
      ),
  },
  { path: '**', component: NotFoundComponent, data: { title: 'Not found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
