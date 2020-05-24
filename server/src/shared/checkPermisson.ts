import { GlobalPermissions } from './global-permissions';
import { SectionPermissions } from './section-permissions';

export function isAllowed(
  userPermissions: Array<GlobalPermissions | SectionPermissions>,
  request: GlobalPermissions | SectionPermissions,
) {
  if (userPermissions.includes(GlobalPermissions.ADMIN)) return true;
  return userPermissions.includes(request);
}
