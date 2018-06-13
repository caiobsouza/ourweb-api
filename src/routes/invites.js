const express = require('express');
const controller = require('../controllers/invites.controller');

module.exports = (app) => {
    const router = express.Router();
    app.use('/invites', router);

    router.get('/', (req, res) => {
        controller.getAll()
            .then(invites => res.json(invites))
            .catch(err => res.status(500).json(err));
    });

    router.get('/:id', (req, res) => {
        controller.getById()
            .then(invite => res.json(invite))
            .catch(err => res.status(500).json(err));
    });

    router.post('/', (req, res) => {
        controller.create(req.body)
            .then(invite => res.status(201).json(invite))
            .catch(err => res.status(500).json(err));
    });

    router.put('/:id', (req, res) => {
        controller.update(req.params.id, res.body)
            .then(invite => res.json(invite))
            .catch(err => res.status(500).json(err));
    });
};