const express = require('express');
const winston = require('winston');

const app = express();

require('./src/middlewares')(app);
require('./src/routes')(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => winston.info(`Listening at ${PORT}`));