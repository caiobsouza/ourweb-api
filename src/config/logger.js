const winston = require('winston');

const logger = () => new winston.transports.Console({
    format: winston.format.combine(
        winston.format.simple()
    )
});

module.exports = logger;