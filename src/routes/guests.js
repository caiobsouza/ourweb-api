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
            .then(created => res.status(201).json(created))
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.put('/:id', (req, res) => {
        controller.update(req.params.id, req.body)
            .then(guest => res.json(guest))
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.delete('/:id', (req, res) => {
        controller.delete(req.params.id)
            .then((guest) => res.json({
                message: 'Removed.',
                data: guest
            }))
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.put('/:id/confirm', (req, res) => {
        controller.confirmGuest(req.params.id, req.body)
            .then(guest => res.json(guest))
            .catch(err => {
                res.status(500).json(err);
            });
    });
};

