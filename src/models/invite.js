const mongoose = require('mongoose');
const crc = require('crc');

const generate_id = () => {
    return crc.crc32(new Date().toISOString()).toString(36).toUpperCase();
};

const InviteSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: generate_id
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    guests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Guest'
        }
    ],
    sent: {
        type: Boolean,
        default: false
    }
});

const Invite = mongoose.model('Invite', InviteSchema);

module.exports = Invite;