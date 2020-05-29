import { SectionPermissions } from '@esn/server/shared';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateInviteDto {
  @IsUUID()
  sectionId: string;
  @IsEnum(SectionPermissions, {
    each: true,
  })
  permissions: SectionPermissions[];
  @IsEmail(
    {},
    {
      each: true,
    },
  )
  emails: string[];
}
