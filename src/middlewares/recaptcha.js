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

module.exports = (req, res, next) => {

    if(process.env.TESTING){
        next();
        return;
    }

    const payload = `secret=${CLIENT_SECRET}&response=${req.body['g-recaptcha-response']}`;

    client.post(`/siteverify?${payload}`, {})
        .then(response => {
            if (response.status != 200) {
                res.status(500).json({ message: 'error calling recaptcha API' });
                return;
            }

            if (!response.data.success) {
                res.status(403).json(response.data);
                return;
            }

            next();
        })
        .catch(err => winston.error(err));
};
