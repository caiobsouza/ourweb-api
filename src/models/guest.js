const mongoose = require('mongoose');
const crc = require('crc');

const generate_id = () => {
    return crc.crc32(new Date().toISOString()).toString(36).toUpperCase();
};

const GuestSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: generate_id
    },
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