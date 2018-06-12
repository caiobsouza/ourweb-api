const { Router } = require('express');
const controller = require('../controllers/guests.controller');
const Guest = require('../models/guest');

module.exports = (app) => {
    const router = Router();

    app.use('/guests', router);

    router.get('/', (req, res) => {
        controller.getAll()
            .then(guests => res.json(guests))
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.get('/:id', (req, res) => {
        controller.getById(req.params.id)
            .then(guest => res.json(guest))
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.post('/', (req, res) => {
        const guest = new Guest(req.body);
        controller.create(guest)
            .then(guest => res.status(201).json(guest))
            .catch(err => {
                res.status(500).json(err);
            });
    });
};

