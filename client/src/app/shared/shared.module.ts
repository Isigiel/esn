import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  ErrorStateMatcher,
  MatNativeDateModule,
  MatRippleModule,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConfirmDialog } from './components/confirm.dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { IconSrcDirective } from '@esn/client/shared/directives/icon-src.directive';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { WithPermissionDirective } from './directives/with-permission.directive';
import { MarkdownModule } from 'ngx-markdown';

const materialModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatListModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatCardModule,
  MatRippleModule,
  MatChipsModule,
  TextFieldModule,
];

export const COMPONENTS = [ConfirmDialog];
export const DIRECTIVES = [IconSrcDirective, WithPermissionDirective];

@NgModule({
  declarations: [COMPONENTS, DIRECTIVES],
  imports: [
    CommonModule,
    materialModules,
    FlexLayoutModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    MarkdownModule,
  ],
  exports: [
    materialModules,
    COMPONENTS,
    DIRECTIVES,
    FlexLayoutModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    MarkdownModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        minWidth: '50vw',
        closeOnNavigation: true,
        disableClose: false,
        hasBackdrop: true,
      },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class SharedModule {
  constructor(registry: MatIconRegistry, sanitizer: DomSanitizer) {
    registry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/set.svg'),
    );
    if (environment?.build) {
      console.log(`esn.world frontend build: ${environment.build}`);
    }
  }
}
