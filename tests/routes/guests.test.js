const express = require('express');
const sinon = require('sinon');
const supertest = require('supertest');
const rewiremock = require('rewiremock').default;
const dummy = require('mongoose-dummy');
const { expect } = require('chai');

const Guest = require('../../src/models/guest');

describe('[Route] /guests', () => {
    let app;
    let request;
    let fixture;
    let controllerMock;

    before(() => {

        app = express();

        fixture = [
            dummy(Guest, { autoDetect: false, returnDate: true }),
            dummy(Guest, { autoDetect: false, returnDate: true })
        ];
        
        controllerMock = {
            getAll: sinon.stub().resolves(fixture),
            getById: sinon.stub().withArgs(1).resolves(fixture[1])
        }

        const route = rewiremock.proxy('../../src/routes/guests', {
            '../controllers/guests.controller': controllerMock
        });

        route(app);
        request = supertest(app);
    });

    it('should return all guests', (done) => {
        request
            .get('/guests')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.deep.equal(fixture);
                done();
            });
    });

    it('should return a guest by id', (done) => {
        request
            .get('/guests/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.deep.equal(fixture[1]);
                done();
            });
    });

    it('should create a guest', (done) => {
        const newGuest = { name: 'Jason' };

        controllerMock.create = sinon.stub().withArgs(newGuest).resolves(new Guest(newGuest));

        request
            .post('/guests')
            .send(newGuest)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.name).to.be.deep.equal(newGuest.name);
                done();
            });
    });

    it('should update a guest', done => {
        const guest = { name: 'Josh' };
        controllerMock.update = sinon.stub().withArgs(1, guest).resolves(new Guest(guest));

        request
            .put('/guests/1')
            .send(guest)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.name).to.be.deep.equal(guest.name);
                done();
            })
    });

    it('should delete a guest', done => {
        controllerMock.delete = sinon.stub().withArgs(1).resolves(fixture[0]);

        request
            .delete('/guests/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.data).to.be.deep.equal(fixture[0]);
                done();
            });
    });

    it('should confirm a guest presence by id', done => {
        fixture[1].confirmed = true;
        controllerMock.confirmGuest = sinon.stub().withArgs(fixture[1]._id).resolves(fixture[1]);

        request
            .put(`/guests/${fixture[1]._id}/confirm`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.confirmed).to.be.true;
                done();
            });
    });
});
