import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  exhaustMap,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';

import * as SectionActions from '../actions/section.actions';
import { MatDialog } from '@angular/material/dialog';
import { SectionCreateDialog } from '@esn/client/administration/components/section-create.dialog';
import { SectionService } from '@esn/client/core/services';
import { ConfirmDialog } from '@esn/client/shared/components/confirm.dialog';
import { EntityOp } from '@ngrx/data';
import { EditMembershipDialogComponent } from '@esn/client/administration/components/edit-membership-dialog.component';
import { Router } from '@angular/router';

@Injectable()
export class SectionEffects {
  openCreateDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.openSectionDialog),
      exhaustMap(() =>
        this.dialog
          .open(SectionCreateDialog, { disableClose: true })
          .afterClosed(),
      ),
      filter((result) => !!result),
      map((section) => SectionActions.createSection({ section })),
    ),
  );
  editMembershipDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.editUserDialog),
      exhaustMap(({ membership }) =>
        this.dialog
          .open(EditMembershipDialogComponent, {
            disableClose: true,
            data: { membership },
          })
          .afterClosed(),
      ),
      filter((result) => !!result),
      map((membership) => SectionActions.updateMembership({ membership })),
    ),
  );
  updateMembership$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.updateMembership),
      switchMap(({ membership }) =>
        this.sectionsService.updateMembership(membership),
      ),
      map(({ section }) =>
        this.sectionsService.createEntityAction(EntityOp.UPDATE_ONE, {
          id: section.id,
          changes: section,
        }),
      ),
    ),
  );
  confirmDeleteDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SectionActions.confirmDeleteSection),
        exhaustMap(({ id }) =>
          this.dialog
            .open(ConfirmDialog, {
              disableClose: true,
              data: {
                title: 'Do you really want to delete this section?',
                result: id,
              },
            })
            .afterClosed(),
        ),
        filter((result) => !!result),
        tap((id) => this.sectionsService.delete(id)),
      ),
    { dispatch: false },
  );
  createSection$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SectionActions.createSection),
        tap(({ section }) => this.sectionsService.add(section)),
      ),
    { dispatch: false },
  );

  createInvites$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SectionActions.createInvite),
        mergeMap((data) =>
          this.sectionsService.createInvites(data).pipe(map(() => data)),
        ),
        tap((data) =>
          this.router.navigate(['/admin/sections', data.sectionId]),
        ),
      ),
    { dispatch: false },
  );

  addUserToSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.addUserToSection),
      switchMap(({ section, user }) =>
        this.sectionsService.addUserToSection({ section, user }),
      ),
      map((section) =>
        this.sectionsService.createEntityAction(EntityOp.UPDATE_ONE, {
          id: section.id,
          changes: section,
        }),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private router: Router,
    private sectionsService: SectionService,
  ) {}
}
