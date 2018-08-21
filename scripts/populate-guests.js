const seeder = require('mongoose-seed');
const path = require('path');
const dotenv = require('dotenv');
const csvtojson = require('csvtojson');

dotenv.config();

csvtojson({ delimiter: ';' })
    .fromFile(path.resolve(__dirname, './guest-list.csv'))
    .then(data => seed(data));

function seed(documents) {

    console.log(documents)

    let data = [
        {
            'model': 'Guest',
            'documents': [...documents]
        }
    ];

    seeder.connect(process.env.MONGO_URI + '?retryWrites=true' || 'mongodb://localhost/wedding', () => {
        seeder.loadModels([
            path.resolve(__dirname, '../src/models/guest.js')
        ]);

        seeder.clearModels(['Guest'], function () {

            seeder.populateModels(data, function () {
                seeder.disconnect();
            });
        });
    });
}
