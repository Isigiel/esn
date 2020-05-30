import { GlobalPermissions } from './global-permissions';
import { SectionPermissions } from './section-permissions';

const extensions = new Map();
extensions.set(GlobalPermissions.ADMIN, [SectionPermissions.SECTION_MANAGE]);
extensions.set(SectionPermissions.SECTION_MANAGE, [
  SectionPermissions.EVENTS_MANAGE,
  SectionPermissions.SECTION_INFO,
]);
extensions.set(SectionPermissions.EVENTS_MANAGE, [
  SectionPermissions.EVENTS_VIEWDRAFTS,
]);
function extend(permission) {
  if (!extensions.has(permission)) {
    return [permission];
  }
  return [
    ...extensions.get(permission),
    ...extensions
      .get(permission)
      .map(extend)
      .reduce((current, add) => [...current, ...add], []),
  ];
}

export function isAllowed(
  userPermissions: Array<GlobalPermissions | SectionPermissions>,
  request: GlobalPermissions | SectionPermissions,
) {
  const permSet = new Set(userPermissions);
  userPermissions.forEach((perm) =>
    extend(perm).forEach((perm) => permSet.add(perm)),
  );
  return permSet.has(request);
}
