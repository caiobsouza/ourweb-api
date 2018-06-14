const Guest = require('../models/guest');

module.exports = {
    getAll() {
        return Guest.find();
    },
    getById(id) {
        return Guest.findById(id);
    },
    create(guest) {
        const doc = new Guest(guest);
        return doc.save();
    },
    update(id, guest) {
        return Guest.findByIdAndUpdate(id, guest, { new: true });
    },
    delete(id) {
        return Guest.findByIdAndRemove(id);
    },
    confirmGuest(id) {
        return Guest.findByIdAndUpdate(id, { confirmed: true }, { new: true });
    }
};
