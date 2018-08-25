const axios = require('axios').default;
const winston = require('winston');

const CLIENT_SECRET = process.env.RECAPTCHA_SECRET;

const client = axios.create({
    baseURL: 'https://www.google.com/recaptcha/api/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
});

module.exports = {
    validateRecaptcha(req, res, next) {
        if (process.env.TESTING) {
            next();
            return;
        }

        const payload = this.formatPayload(CLIENT_SECRET, req.body['g-recaptcha-response']);

        client.post(`/siteverify?${payload}`, {})
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
    },
    formatPayload(secret, response) {
        return `secret=${secret}&response=${response}`;
    }
};