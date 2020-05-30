import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionRoutingModule } from './section-routing.module';
import { SectionComponent } from './containers/section.component';
import { SharedModule } from '@esn/client/shared';
import { EffectsModule } from '@ngrx/effects';
import { AboutPageEffects } from './effects/about-page.effects';
import { EditAboutPageComponent } from './containers/edit-about-page.component';

@NgModule({
  declarations: [SectionComponent, EditAboutPageComponent],
  imports: [CommonModule, SectionRoutingModule, SharedModule, EffectsModule.forFeature([AboutPageEffects])],
})
export class SectionModule {}
