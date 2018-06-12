const express = require('express');
const sinon = require('sinon');
const rewiremock = require('rewiremock').default;
const supertest = require('supertest');
const { expect } = require('chai');

describe('[Route] /' , () => {
    let app;
    let request;

    before(() => {
        app = express();

        const controllerMock = {
            get: sinon.stub().returns('200 OK')
        }

        const route = rewiremock.proxy('../../src/routes/base', {
            '../controllers/base.controller': controllerMock
        });

        route(app);
        request = supertest(app);
    });

    it('should return 200 OK', (done) => {
        request
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.body).to.be.equal('200 OK');
                done();
            });
    });
})