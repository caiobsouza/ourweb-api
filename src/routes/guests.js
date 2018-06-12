const { Router } = require('express');
const controller = require('../controllers/guests.controller');

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
};

