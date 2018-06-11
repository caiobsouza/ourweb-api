const Guest = require('../models/guest');

module.exports = {
    getAll: () => {
        return Guest.find();
    }
};
