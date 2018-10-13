const axios = require('axios').default;

module.exports = axios.create({
    baseURL: 'https://www.google.com/recaptcha/api/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
});
