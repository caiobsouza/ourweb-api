const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        enum: [
            'FAMILIA',
            'AMIGO',
            'COLEGA',
            'OUTRO'
        ]
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    shallConfirm: {
        type: Boolean,
        default: false
    }
});

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;