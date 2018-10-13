const winston = require('winston');
const recaptchaClient = require('../recaptcha-client');

const CLIENT_SECRET = process.env.RECAPTCHA_SECRET;

const recaptcha = {
    formatPayload(secret, response) {
        return `secret=${secret}&response=${response}`;
    },
    validateRecaptcha(req, res, next) {
        if (process.env.TESTING) {
            next();
            return;
        }

        const payload = recaptcha.formatPayload(CLIENT_SECRET, req.body['g-recaptcha-response']);

        recaptchaClient.post(`/siteverify?${payload}`, {})
            .then(response => {
                if (response.status != 200) {
                    res.status(500).json({
                        message: 'error calling recaptcha API'
                    });
                    return;
                }

                if (!response.data.success) {
                    res.status(403).json(response.data);
                    return;
                }

                next();
            })
            .catch(err => winston.error(err));
    }
};

module.exports = recaptcha;