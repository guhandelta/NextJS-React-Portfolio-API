const jwt = require('express-jwt');
const jwksRSA = require('jwks-rsa');
const config = require('../config/dev')

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


// Auth middleware to verify the user role
exports.checkRole = role => (req, res, next) => {
    const user = req.user; // user will be available as checkJWT is used

    if (user && user[config.AUTH0_NAMESPACE + '/roles'].includes(role)) {
        next();
    } else {
        return res.status(401).send('You are not authorized to access this data');
    }
}
