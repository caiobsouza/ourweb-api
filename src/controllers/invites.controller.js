const Invite = require('../models/invite');

module.exports = {
    getAll() {
        return Invite.find();
    },
    getById(id){
        return Invite.findById(id);
    },
    create(doc){
        const invite = new Invite(doc);
        return invite.save();
    }
};
