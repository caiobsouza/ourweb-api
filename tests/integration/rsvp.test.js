const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dummy = require('mongoose-dummy');

const app = require('../../src/app');
const db = require('../../src/config/db');
const Rsvp = require('../../src/models/rsvp');

const { expect } = chai;
chai.use(chaiHttp);

process.env.TESTING = true;

describe('[Integration] Rsvp', () => {

    let server;
    let RSVP;

    before(() => {
        RSVP = dummy(Rsvp, { ignoreFields: ['_v'], autoDetect: false, returnDate: true });

        db.setup(() => console.log('connected to database'), err => console.error(err));

        server = http.createServer(app);
        server.listen(50034, () => {
            console.log('Test server listening at 50034');
        });
    });

    it('should return the RSVP', done => {
        chai.request(server)
            .get('/rsvp')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                done();
            });
    });

    it('should create a RSVP', done => {
        chai.request(server)
            .post('/rsvp')
            .send(RSVP)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(201);
                expect(res).to.be.json;

                const createdInvite = res.body;

                expect(createdInvite.title).to.be.equal(RSVP.title);
                expect(createdInvite.description).to.be.equal(RSVP.description);

                done();
            });
    });

    after(() => {
        Rsvp.findByIdAndRemove(RSVP._id)
        .then(() => console.log('RSVP integration test garbage cleaned up.'))
        .catch(() => console.error('Error cleaning up RSVP integration tests'));
    });
});
