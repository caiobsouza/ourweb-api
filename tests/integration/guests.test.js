const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dummy = require('mongoose-dummy');

const app = require('../../src/app');
const db = require('../../src/config/db');
const Guest = require('../../src/models/guest');

const { expect } = chai;
chai.use(chaiHttp);

describe('[Integration] Guests', () => {

    let server;
    let GUEST;

    before(() => {
        GUEST = dummy(Guest, { ignoreFields: ['_v'], autoDetect: false, returnDate: true });

        db.setup(() => console.log('connected to database'), err => console.error(err));

        server = http.createServer(app);
        server.listen(50032, () => {
            console.info('Test server listening at 50032');
        });
    });

    it('should return the guests', done => {
        chai.request(server)
            .get('/guests')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                done();
            });
    });

    it('should create a guest', done => {

        chai.request(server)
            .post('/guests')
            .send(GUEST)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(201);
                expect(res).to.be.json;

                const createdGuest = res.body;

                expect(createdGuest.name).to.be.equal(GUEST.name);
                expect(createdGuest.relationship).to.be.equal(GUEST.relationship);
                expect(createdGuest.shallConfirm).to.be.equal(GUEST.shallConfirm);
                expect(createdGuest.confirmed).to.be.equal(GUEST.confirmed);

                done();
            });
    });

    it('should update a guest', done => {
        GUEST.name = 'Juazeiro';

        chai.request(server)
            .put(`/guests/${GUEST._id}`)
            .send(GUEST)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;

                expect(res.body.name).to.be.equal('Juazeiro');
                done();
            });
    });
    
    it('should confirm a guest', done => {
        chai.request(server)
            .put(`/guests/${GUEST._id}/confirm`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                expect(res.body.confirmed).to.be.true;
                done();
            });
    });

    it('should delete a guest', done => {
        chai.request(server)
            .del(`/guests/${GUEST._id}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                done();
            });
    });

});
