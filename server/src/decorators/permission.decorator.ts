import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { PermissionGuard } from '../guards/permission.guard';

export const Permission = (perm: GlobalPermissions | SectionPermissions) =>
  applyDecorators(SetMetadata('permission', perm)/*, UseGuards(PermissionGuard)*/);
