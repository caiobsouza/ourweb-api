require('dotenv').config();
const http = require('http');
const db = require('./src/config/db');
const winston = require('winston');
const logger = require('./src/config/logger');
const smtp = require('./src/config/smtp');

winston.add(logger());

db.setup(() => {
    winston.info('Database connection established');
}, (err) => {
    winston.error(`Database connection error: ${err.message}`);
});

smtp.verify((error, success) => {
    if (!success) {
        winston.error(`SMTP server connection has failed. ${error.message}`);
    }
    winston.info('SMTP server is ready to take messages');
 });

const app = require('./src/app');

const PORT = process.env.PORT || 5001;
const server = http.createServer(app);

server.listen(PORT, () => {
    winston.info(`Server listening at ${PORT}`);
});

server.on('error', (err) => {
    winston.error(err.message);
});
