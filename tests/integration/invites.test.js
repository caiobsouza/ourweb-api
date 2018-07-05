const http = require('http');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dummy = require('mongoose-dummy');

const app = require('../../src/app');
const db = require('../../src/config/db');
const Invite = require('../../src/models/invite');

const { expect } = chai;
chai.use(chaiHttp);

describe('[Integration] Invites', () => {
    
    let server;
    let _invite;
    const GUEST = '5b216b3606618e1645a3611e';

    before(() => {
        _invite = dummy(Invite, { ignoreFields: ['_v'], autoDetect: false, returnDate: true });

        db.setup(() => console.log('connected to database'), err => console.error(err));

        server = http.createServer(app);
        server.listen(50033, () => {
            console.log('Test server listening at 50033');
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
            .send(_invite)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(201);
                expect(res).to.be.json;

                const createdInvite = res.body;

                expect(createdInvite.title).to.be.equal(_invite.title);
                expect(createdInvite.description).to.be.equal(_invite.description);

                done();
            });
    });

    it('should update a invite', done => {
        _invite.title = 'Another Title';

        chai.request(server)
            .put(`/invites/${_invite._id}`)
            .send(_invite)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;

                expect(res.body.title).to.be.equal('Another Title');
                done();
            });
    });

    it('should add a guest to an invite', done => {
        chai.request(server)
            .post(`/invites/${_invite._id}/guest/${GUEST}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;

                expect(res.body.guests).to.contains(GUEST);
                done();
            });
    });

    it('should remove a guest from an invite', done => {
        chai.request(server)
            .delete(`/invites/${_invite._id}/guest/${GUEST}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;

                expect(res.body.guests).to.not.contains(GUEST);
                done();
            });
    });

    it('should delete a invite', done => {
        chai.request(server)
            .del(`/invites/${_invite._id}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.deep.equal(200);
                expect(res).to.be.json;
                done();
            });
    });
});
