const Rsvp = require('../models/rsvp');

module.exports = {
    getAll() { 
        return Rsvp.find();
    },
    create(rsvp) {
        const doc = new Rsvp(rsvp);
        return doc.save();
    }
};
