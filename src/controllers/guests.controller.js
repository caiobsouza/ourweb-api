const Guest = require('../models/guest');

module.exports = {
    getAll() {
        return Guest.find();
    },
    getById(id) {
        return Guest.findById(id);
    }
};
