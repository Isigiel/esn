export function assignTennant() {
  return (req, res, next) => {
    const hostParts = req.hostname.split('.');
    if (hostParts.length === 3) {
      req.tennant = hostParts[0];
    } else if (req.hostname === 'localhost') {
      req.tennant = 'tumi';
    }
    next();
  };
}
