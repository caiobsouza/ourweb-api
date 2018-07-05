const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://wedding-api.auth0.com/.well-known/jwks.json'
    }),
    audience: 'wedding-api',
    issuer: 'https://wedding-api.auth0.com/',
    algorithms: ['RS256']
});