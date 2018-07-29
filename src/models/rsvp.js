const mongoose = require('mongoose');

const RsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    }
});

const Rsvp = mongoose.model('Rsvp', RsvpSchema);

module.exports = Rsvp;