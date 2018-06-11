const mongoose = require('mongoose');
const winston = require('winston');

module.exports = {
    setup() {
        mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27001', (err) => {
            if (err) {
                winston.error(`db connection error: ${err.message}`);
            }
            winston.log('db connection stablished');
        });
    }
}