const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;