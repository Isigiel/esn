import { Section } from '@esn/client/core/models/section';
import { User } from '@esn/client/core/models/user';
import { SectionPermissions } from '@esn/shared/section-permissions';

export interface SectionMembership {
  id: string;
  section: Section;
  user: User;
  permissions: SectionPermissions[];
}
