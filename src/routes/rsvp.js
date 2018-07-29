const express = require('express');
const controller = require('../controllers/rsvp.controller');

module.exports = (app) => {
    const router = express.Router();
    app.use('/rsvp', router);

    router.post('/', (req, res) => {
        controller.create(req.body)
            .then(invite => res.status(201).json(invite))
            .catch(err => res.status(500).json(err));
    });
};