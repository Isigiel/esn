import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GlobalPermissions } from '@esn/shared/global-permissions';
import { SectionPermissions } from '@esn/shared/section-permissions';
import { isAllowed } from '@esn/shared/checkPermisson';
import { User } from '../users/user.entity';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const permission = this.reflector.getAllAndOverride<
      GlobalPermissions | SectionPermissions
    >('permission', [context.getHandler(), context.getClass()]);
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.profile;
    if (!user || !user.permissions) return false;
    return isAllowed(
      [
        ...user.permissions,
        ...(user.memberships.find(m => m.section.shortCode === request.tenant)
          ?.permissions ?? []),
      ],
      permission,
    );
  }
}
