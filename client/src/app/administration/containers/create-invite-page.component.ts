import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from '@esn/client/core/models';
import { ActivatedRoute } from '@angular/router';
import { SectionService, UserService } from '@esn/client/core/services';
import { Store } from '@ngrx/store';
import * as fromAdmin from '@esn/client/administration/reducers';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { SectionActions } from '@esn/client/administration/actions/idex';

@Component({
  selector: 'esn-create-invite-page',
  template: `
    <esn-create-section-form
      (save)="createInvite($event)"
    ></esn-create-section-form>
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
export class CreateInvitePageComponent {
  section$: Observable<Section>;
  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private store: Store<fromAdmin.State>,
  ) {
    this.section$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((id) => this.sectionService.setFilter({ id })),
      switchMap(() => this.sectionService.filteredEntities$),
      map((results) => results[0]),
    );
  }

  async createInvite(data: {
    permissions: SectionPermissions[];
    emails: string[];
  }) {
    const section = await this.section$.pipe(first()).toPromise();
    this.store.dispatch(
      SectionActions.createInvite({ sectionId: section.id, ...data }),
    );
  }
}
