import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionService } from '@esn/client/core/services';
import { merge, Observable } from 'rxjs';
import { Section } from '@esn/client/core/models';
import * as fromAdmin from '@esn/client/administration/reducers';
import { Store } from '@ngrx/store';
import { SectionActions } from '@esn/client/administration/actions/idex';

@Component({
  selector: 'esn-sections-page',
  template: `
    <esn-section-list
      [sections]="sections$ | ngrxPush"
      (delete)="deleteSection($event)"
    ></esn-section-list>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsPageComponent {
  sections$: Observable<Section[]>;

  constructor(
    private sectionsService: SectionService,
    private store: Store<fromAdmin.State>,
  ) {
    this.sections$ = merge(
      this.sectionsService.getAll(),
      this.sectionsService.entities$,
    );
  }

  newSection() {
    this.store.dispatch(SectionActions.openSectionDialog());
  }

  deleteSection(id: string) {
    this.store.dispatch(SectionActions.confirmDeleteSection({ id }));
  }
}
