const winston = require('winston');
const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dummy = require('mongoose-dummy');
const { describe, it, before } = require('mocha');

const app = require('../src/app');
const Invite = require('../src/models/invite');

const { expect } = chai;
chai.use(chaiHttp);

describe('[Integration] Invites', () => {

    let server;
    let INVITE;

    before(() => {
        INVITE = dummy(Invite, { ignore: '_v', returnDate: true });

        server = http.createServer(app);
        server.listen(5002, () => {
            winston.log('Test server listening at 5002');
        });
    });

    it('should return the invites', done => {
        chai.request(server)
            .get('/invites')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                done();
            });
    });

    it('should create a invite', done => {
        chai.request(server)
            .post('/invites')
            .send(INVITE)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(201);
                expect(res).to.be.json;

                const createdInvite = res.body;

                expect(createdInvite.title).to.be.equal(INVITE.title);
                expect(createdInvite.description).to.be.equal(INVITE.description);
                
                done();
            });
    });

    it('should update a invite', done => {
        INVITE.title = 'Another Title';

        chai.request(server)
            .put(`/invites/${INVITE._id}`)
            .send(INVITE)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                
                expect(res.body.title).to.be.equal('Another Title');
                done();
            });
    });

    it('should delete a invite', done => {
        chai.request(server)
            .del(`/invites/${INVITE._id}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                done();
            });
    });
});
