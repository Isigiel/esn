export function assignTenant() {
  return (req, res, next) => {
    const hostParts = req.hostname.split('.');
    if (hostParts.length === 3) {
      req.tenant = hostParts[0];
    } else if (req.hostname === 'localhost') {
      req.tenant = 'tumi';
    }
    next();
  };
}
