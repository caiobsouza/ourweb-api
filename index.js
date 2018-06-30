const http = require('http');
const db = require('./src/config/db');
const logger = require('./src/config/log')();

db.setup(() => {
    logger.log('db connection stablished');
}, (err) => {
    logger.error(`db connection error: ${err.message}`);
});

const app = require('./src/app');

const PORT = process.env.PORT || 5001;
const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`Server listening at ${PORT}`);
});

server.on('error', (err) => {
    logger.error(err.message);
});
