import { SectionMembership } from '@esn/client/core/models/section-membership';

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  memberships?: SectionMembership[];
}
