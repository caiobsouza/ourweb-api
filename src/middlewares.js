const { json, urlencoded } = require('body-parser');
const corsOptions = require('./middlewares/cors-options');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors(corsOptions));
    app.use(json());
    app.use(urlencoded({ extended: false }));
};
