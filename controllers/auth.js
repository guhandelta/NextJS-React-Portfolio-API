const jwt = require('express-jwt');
const jwksRSA = require('jwks-rsa');


// Auth middleware | Checks for access token in authorization headers of req & verifies the token with Auth0 JSON Web Key Set(JWKS)
exports.checkJWT = jwt({
    secret: jwksRSA.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: 'https://guhaprasaanth.auth0.com/.well-known/jwks.json' // Some keys provided by Auth0
    }),
    audience: 'https://guhaprasaanth.auth0.com/api/v2/',
    issuer: 'https://guhaprasaanth.auth0.com/',
    algorithms: ['RS256']
}); 
