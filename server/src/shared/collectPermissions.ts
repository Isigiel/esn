export function collectPermissions(user, shortCode) {
  return [
    ...(user?.permissions ?? []),
    ...(user?.memberships?.find((m) => m.section.shortCode === shortCode)
      ?.permissions ?? []),
  ];
}
