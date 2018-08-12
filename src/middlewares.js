const { json, urlencoded } = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors());
    app.use(json());
    app.use(urlencoded({ extended: false }));
};
