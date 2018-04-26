module.exports = (app) => {
    const base = require('./routes/base');
    base(app, require('./controllers/base.controller'));
};
