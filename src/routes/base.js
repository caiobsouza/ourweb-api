const { Router } = require('express');

module.exports = (app, controller) => {
    
    const router = Router();

    app.use(router);

    router.get('/', (req, res) => {
        res.json(controller.get());
    });

};
