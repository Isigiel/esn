import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Section, SectionMembership, User } from '@esn/client/core/models';
import { ActivatedRoute } from '@angular/router';
import { SectionService, UserService } from '@esn/client/core/services';
import { first, map, switchMap, tap } from 'rxjs/operators';
import {
  SectionActions,
  UserSearchActions,
} from '@esn/client/administration/actions/idex';
import * as fromAdmin from '@esn/client/administration/reducers';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'esn-view-section-page',
  template: `
    <esn-section-info [section]="section$ | ngrxPush"></esn-section-info>
    <esn-user-search
      (userSelected)="addUser($event)"
      (search)="search($event)"
      [userOptions]="searchResults$ | ngrxPush"
      [searching]="loading$ | ngrxPush"
    ></esn-user-search>
    <esn-section-member-list
      (edit)="editUser($event)"
      [members]="(section$ | ngrxPush).memberships"
    ></esn-section-member-list>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        padding: 2rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSectionPageComponent {
  section$: Observable<Section>;
  searchResults$: Observable<User[]>;
  loading$: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private userService: UserService,
    private store: Store<fromAdmin.State>,
  ) {
    this.section$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => this.sectionService.setFilter({ id })),
      switchMap(() => this.sectionService.filteredEntities$),
      map(results => results[0]),
    );
    this.loading$ = store.pipe(select(fromAdmin.selectSearchLoading));
    this.searchResults$ = combineLatest([
      this.store.select(fromAdmin.selectSearchUserIds),
      this.userService.entityMap$,
    ]).pipe(
      map(([searchIds, users]) =>
        searchIds
          .map(id => users[id])
          .filter((user): user is User => user != null),
      ),
    );
  }
  search(query: string) {
    this.store.dispatch(UserSearchActions.searchUser({ query }));
  }
  async addUser(user: User) {
    const section = await this.section$.pipe(first()).toPromise();
    this.store.dispatch(SectionActions.addUserToSection({ user, section }));
  }

  editUser(membership: SectionMembership) {
    this.store.dispatch(SectionActions.editUserDialog({ membership }));
  }
}
