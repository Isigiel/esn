import { createAction, props } from '@ngrx/store';
import { Section, SectionMembership, User } from '@esn/client/core/models';
import { SectionPermissions } from '@esn/shared/section-permissions';

export const openSectionDialog = createAction('[Section] Open dialog');

export const createSection = createAction(
  '[Section] Create new',
  props<{ section: Section }>(),
);
export const confirmDeleteSection = createAction(
  '[Section] Confirm delete',
  props<{ id: string }>(),
);
export const addUserToSection = createAction(
  '[Section] Add user to section',
  props<{ user: User; section: Section }>(),
);
export const editUserDialog = createAction(
  '[Section] Edit user dialog',
  props<{ membership: SectionMembership }>(),
);
export const updateMembership = createAction(
  '[Section] Update Membership',
  props<{ membership: SectionMembership }>(),
);
export const createInvite = createAction(
  '[Section] Create Invite',
  props<{
    sectionId: string;
    permissions: SectionPermissions[];
    emails: string[];
  }>(),
);
/*export const createInviteSuccess = createAction(
  '[Section] Create Invite Success',
);*/
