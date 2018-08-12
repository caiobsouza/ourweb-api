const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

let authorize = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://wedding-api.auth0.com/.well-known/jwks.json'
    }),
    issuer: 'https://wedding-api.auth0.com/',
    algorithms: ['RS256']
});

if (process.env.TESTING) {
    authorize = (req, res, next) => next();
}

module.exports = authorize;