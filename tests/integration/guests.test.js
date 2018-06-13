const winston = require('winston');
const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dummy = require('mongoose-dummy');

const app = require('../../src/app');
const Guest = require('../../src/models/guest');

const { expect } = chai;
chai.use(chaiHttp);

describe('[Integration] Guests', () => {

    let server;
    let GUEST;

    before(() => {
        GUEST = dummy(Guest, { ignore: '_v', returnDate: true });

        server = http.createServer(app);
        server.listen(5002, () => {
            winston.info('Server listening at 5002');
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
