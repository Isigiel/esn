import { SectionMembership } from '@esn/client/core/models/section-membership';

export interface Section {
  id: string;
  name: string;
  university: string;
  shortCode: string;
  esnId: string;
  esnCode: string;
  memberships?: SectionMembership[];
}
