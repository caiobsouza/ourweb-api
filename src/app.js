const express = require('express');
const db = require('./config/db');

const app = express();

db.setup();

require('./middlewares')(app);
require('./routes')(app);

module.exports = app;