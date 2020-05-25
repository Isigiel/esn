import { SectionMembership } from '@esn/client/core/models/section-membership';
import { GlobalPermissions } from '@esn/shared/global-permissions';

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  permissions: GlobalPermissions[];
  memberships?: SectionMembership[];
}
