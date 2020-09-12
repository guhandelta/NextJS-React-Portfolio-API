const jwt = require('express-jwt');
const jwksRSA = require('jwks-rsa');
const request = require('request');
const config = require('../config');

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


exports.getAccessToken = (callback) => {
    const options = {
        method: 'POST', //Req type
        url: config.AUTH0_TOKEN_URL,
        headers: { 'content-type': 'application/json' }, //Data format
        form: { // data for auth0
            grant_type: 'client_credentials',
            client_id: config.AUTH0_CLIENT_ID,
            client_secret: config.AUTH0_CLIENT_SECRET,
            audience: config.AUTH0_AUDIENCE
        }
    }

    return new Promise((resolve, reject) => {

        request(options, (error, res, body) => { //This callback fn will be exe when a response from the server is received | error,res,body are-
            //- received from the server's response

            // Exe the received callback with the error, in case of any errors or exe the callback with the body, when the req is resolved
            if (error) { reject(new Error(error)); }

            // The body received from the server will be stringified, so it has to be conv to an obj
            resolve(body ? JSON.parse(body) : '');
        });
    })

}

exports.getAuth0User = (accessToken) => (userId) => {
    const optionsObj = {
        method: 'GET',
        url: `${config.AUTH0_DOMAIN}/api/v2/users/${userId}?fields=name,picture,user_id`,
        headers: { authorization: `Bearer ${accessToken}` }
    };

    return new Promise((resolve, reject) => {

        request(optionsObj, (error, res, body) => { //This callback fn will be exe when a response from the server is received | error,res,body are-
            //- received from the server's response

            // Exe the received callback with the error, in case of any errors or exe the callback with the body, when the req is resolved
            if (error) { reject(new Error(error)); }

            // The body received from the server will be stringified, so it has to be conv to an obj
            resolve(body ? JSON.parse(body) : '');
        });
    })
}
