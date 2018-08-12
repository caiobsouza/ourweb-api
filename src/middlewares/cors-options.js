const origins = process.env.CORS_ORIGINS.split(',');

const OPTIONS = {
    origin: origins,
    method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 //Some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = OPTIONS;