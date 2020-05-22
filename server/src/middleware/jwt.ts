import { expressJwtSecret } from 'jwks-rsa';
import * as jwt from 'express-jwt';

export function handleToken() {
return jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://tumi.eu.auth0.com/.well-known/jwks.json',
  }),
  credentialsRequired: false,
  audience: 'esn.events',
  issuer: 'https://tumi.eu.auth0.com/',
  algorithms: ['RS256'],
})
}
