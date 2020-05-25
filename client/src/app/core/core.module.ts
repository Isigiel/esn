import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationRailComponent } from './components/navigation-rail/navigation-rail.component';
import { NavigationSheetComponent } from './components/navigation-sheet/navigation-sheet.component';
import { StoreModule } from '@ngrx/store';
import * as fromLayout from './reducers/layout.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from '@esn/client/core/containers';
import { SharedModule } from '@esn/client/shared';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from '@esn/client/core/services/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutEffects, RouterEffects } from '@esn/client/core/effects';
import { NotFoundComponent } from '@esn/client/core/components/not-found.component';
import { LoginComponent } from '@esn/client/core/components/login.component';

export const COMPONENTS = [
  AppComponent,
  NavigationRailComponent,
  NavigationSheetComponent,
  NotFoundComponent,
  LoginComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature(fromLayout.layoutFeatureKey, fromLayout.reducer),
    EffectsModule.forFeature([LayoutEffects, RouterEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  exports: [COMPONENTS],
})
export class CoreModule {}
