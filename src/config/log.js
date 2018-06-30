const winston = require('winston');

module.exports = () => {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({ format: winston.format.simple() })
        ]
    });
};
