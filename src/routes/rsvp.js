const express = require('express');
const { validateRecaptcha } = require('../middlewares/recaptcha');
const controller = require('../controllers/rsvp.controller');
const authorize = require('../middlewares/auth');

module.exports = (app) => {
    const router = express.Router();
    app.use('/rsvp', router);

    router.get('/', authorize, (req, res) => {
        controller.getAll()
            .then(responses => res.status(200).json(responses))
            .catch(err => res.status(500).json(err));
    });

    router.post('/', validateRecaptcha,  (req, res) => {
        controller.create(req.body)
            .then(invite => res.status(201).json(invite))
            .catch(err => res.status(500).json(err));
    });
};