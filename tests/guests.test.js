const express = require('express');
const sinon = require('sinon');
const supertest = require('supertest');
const rewiremock = require('rewiremock').default;
const dummy = require('mongoose-dummy');
const { expect } = require('chai');

const Guest = require('../src/models/guest');

describe('Guests (/guests)', () => {
    let app;
    let controller;
    let request;
    let fixture

    before(() => {

        app = express();

        fixture = [
            dummy(Guest, { ignore: '_v', returnDate: true }),
            dummy(Guest, { ignore: '_v', returnDate: true })
        ];

        const controllerMock = {
            getAll: sinon.stub().resolves(fixture)
        }

        const route = rewiremock.proxy('../src/routes/guests', {
            '../controllers/guests.controller': controllerMock
        });

        route(app);
        request = supertest(app);
    });

    it('Should return all guests', (done) => {
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
});