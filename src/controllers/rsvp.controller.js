const Rsvp = require('../models/rsvp');

module.exports = {
    create(rsvp) {
        const doc = new Rsvp(rsvp);
        return doc.save();
    }
};
