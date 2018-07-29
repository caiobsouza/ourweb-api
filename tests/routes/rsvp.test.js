const express = require('express');
const sinon = require('sinon');
const supertest = require('supertest');
const rewiremock = require('rewiremock').default;
const dummy = require('mongoose-dummy');
const { expect } = require('chai');

const Rsvp = require('../../src/models/rsvp');

describe('[Route] /rsvp', () => {
    let app;
    let request;
    let fixture;
    let controllerMock;

    before(() => {

        app = express();

        fixture = [
            dummy(Rsvp, { autoDetect: false, returnDate: true }),
            dummy(Rsvp, { autoDetect: false, returnDate: true })
        ];
        
        controllerMock = {
            create: sinon.stub().resolves(fixture)
        }

        const route = rewiremock.proxy('../../src/routes/rsvp', {
            '../controllers/rsvp.controller': controllerMock
        });

        route(app);
        request = supertest(app);
    });

    it('should register a rsvp response', (done) => {
        const newRsvp = { name: 'Jason', confirmed: true };

        controllerMock.create = sinon.stub().withArgs(newRsvp).resolves(new Rsvp(newRsvp));

        request
            .post('/rsvp')
            .send(newRsvp)
            .expect(201)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body.name).to.be.deep.equal(newRsvp.name);
                done();
            });
    });

});
