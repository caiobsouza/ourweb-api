const gcs = require('@google-cloud/storage')();
const fs = require('fs');
const winston = require('winston');
const logger = require('../src/config/logger');

winston.add(logger());

const dotEnvExists = fs.existsSync('.env');
if (dotEnvExists) {
    winston.info('[get-env] .env exists, probably running on development environment');
    process.exit();
}

const bucketName = 'envvar-wedding-caiogabi';

winston.info(`Downloading .env from bucket "${bucketName}"`);

gcs
    .bucket(bucketName)
    .file('.env')
    .download({ destination: '.env' })
    .then(() => {
        winston.info('[get-env]: .env downloaded successfully');
    })
    .catch(e => {
        winston.error(`[get-env]: There was an error: ${JSON.stringify(e, undefined, 2)}`);
    });