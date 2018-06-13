const Invite = require('../models/invite');

module.exports = {
    getAll() {
        return Invite.find();
    },
    getById(id) {
        return Invite.findById(id);
    },
    create(doc) {
        const invite = new Invite(doc);
        return invite.save();
    },
    update(id, doc) {
        return Invite.findByIdAndUpdate(id, doc, { new: true });
    },
    delete(id){
        return Invite.findByIdAndRemove(id);
    }
};
