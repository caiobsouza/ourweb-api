const mongoose = require('mongoose');

module.exports = {
    setup(success, error) {
        const uri = `${process.env.MONGO_URI}?retryWrites=true`  || 'mongodb://localhost:27017/wedding';

        mongoose.connect(uri)
            .then(() => {
                success();
            })
            .catch((err) => {
                error(err);
            });
    }
};
