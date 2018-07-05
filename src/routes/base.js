const { Router } = require('express');
const controller = require('../controllers/base.controller');

module.exports = (app) => {
    const router = Router();

    app.use('/', router);

    router.get('/', (req, res) => {
        res.json(controller.get());
    });

};
