const winston = require('winston');

module.exports = (err, req, res, next) => {
    winston.error(err.message);
    if (err.name === 'UnauthorizedError') {
        return res.status(403).send({
            success: false,
            message: 'Unauthorized.'
        });
    }
};
