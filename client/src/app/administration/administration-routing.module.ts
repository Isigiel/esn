import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsPageComponent } from '@esn/client/administration/containers';
import { ViewSectionPageComponent } from '@esn/client/administration/containers/view-section-page.component';
import { SectionExistsGuard } from '@esn/client/administration/guards/section-exists.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sections' },
  {
    path: 'sections',
    component: SectionsPageComponent,
    data: { title: 'manage sections' },
  },
  {
    path: 'sections/:id',
    canActivate: [SectionExistsGuard],
    data: { title: 'section details' },
    component: ViewSectionPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
