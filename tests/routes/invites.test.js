const express = require('express');
const chai = require('chai');
const { expect } = chai;
const supertest = require('supertest');
const sinon = require('sinon');
const dummy = require('mongoose-dummy');
const rewiremock = require('rewiremock').default;

const Invite = require('../../src/models/invite');

describe('[Route] /invites', () => {
    let app;
    let fixture;
    let controllerMock;
    let request;

    before(() => {
        app = express();

        fixture = [
            dummy(Invite, { ignore: '_v', returnDate: true }),
            dummy(Invite, { ignore: '_v', returnDate: true })
        ]

        controllerMock = {
            getAll: sinon.stub().resolves(fixture),
            getById: sinon.stub().resolves(fixture[1])
        };

        const route = rewiremock.proxy('../../src/routes/invites', {
            '../controllers/invites.controller': controllerMock
        });

        route(app);
        request = supertest(app);
    });

    it('should return all invites', done => {
        request
            .get('/invites')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.deep.equal(fixture);
                done();
            });
    });

    it('should return an invite by id', done => {
        request
            .get('/invites/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.deep.equal(fixture[1]);
                done();
            });
    });

    it('should create an invite', done => {
        const INVITE = {
            title: 'An Awesome Title',
            description: 'Some Description',
            guests: ["5b2088b00000000000000000"]
        };

        controllerMock.create = sinon.stub().withArgs(INVITE).resolves(new Invite(INVITE));

        request
            .post('/invites')
            .send(INVITE)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;

                expect(res.body.title).to.be.deep.equal(INVITE.title);
                expect(res.body.description).to.be.deep.equal(INVITE.description);
                expect(res.body.guests).to.be.deep.equal(INVITE.guests);
                done();
            });
    });

    it('should update an invite', done => {
        const invite = { title: 'Josh' };
        controllerMock.update = sinon.stub().withArgs(1, invite).resolves(new Invite(invite));

        request
            .put('/invites/1')
            .send(invite)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.title).to.be.deep.equal(invite.title);
                done();
            })
    });

    it('should delete a invite', done => {
        controllerMock.delete = sinon.stub().withArgs(1).resolves(fixture[0]);

        request
            .delete('/invites/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.data).to.be.deep.equal(fixture[0]);
                done();
            });
    });

    it('should associate a guest to an invite', done => {
        const guest = '5b2088b00000000000000001';
        fixture[1].guests.push(guest);
        controllerMock.addGuest = sinon.stub().withArgs(1, guest).resolves(fixture[1]);

        request
            .post('/invites/1/guest/5b2088b00000000000000001')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.guests).to.contain(guest);
                done();
            });
    });

    it('should remove a guest from an invite', done => {
        controllerMock.removeGuest = sinon.stub().withArgs(1, null).resolves(fixture[1]);

        request
            .delete('/invites/1/guest/5b2088b00000000000000001')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                done();
            });
    });
});

