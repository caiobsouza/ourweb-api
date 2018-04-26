const express = require('express');
const sinon = require('sinon');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Default (/)' , () => {
    let app;
    let controller;
    let request;

    beforeAll(() => {
        app = express();

        controller = require('../src/controllers/base.controller');

        require('../src/routes/base')(app, controller);
        request = supertest(app);
    });

    it('Should return 200 OK', (done) => {
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