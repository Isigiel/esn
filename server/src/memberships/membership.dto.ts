import { SectionPermissions } from '@esn/shared/section-permissions';
import { IsEnum } from 'class-validator';

export class UpdateMembershipDto {
  @IsEnum(SectionPermissions, { each: true })
  permissions: SectionPermissions[];
}
