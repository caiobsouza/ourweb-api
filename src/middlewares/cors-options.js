const OPTIONS = {
    origin: [
        'https://gabiecaio.site',
        'http://gabiecaio.site',
        'http://gabiecaio.local',
        /\.caiosouza\.me$/
    ],
    method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 //Some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = OPTIONS;