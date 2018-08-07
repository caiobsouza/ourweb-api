const express = require('express');

const app = express();

require('./middlewares')(app);
require('./routes')(app);

app.use(require('./middlewares/handle-errors'));

module.exports = app;