const sinon = require('sinon');
const supertest = require('supertest');
const rewiremock = require('rewiremock').default;
const {
    expect
} = require('chai');
const {
    formatPayload
} = require('../../src/middlewares/recaptcha')

describe('[Middleware] Recaptcha', () => {
    let recaptchaMock;

    before(() => {
        recaptchaMock = rewiremock.proxy('../../src/middlewares/recaptcha', {
            '../recaptcha-client': {
                post: sinon.stub().resolves({
                    status: 403,
                    data: {
                        success: false
                    }
                })
            }
        });
    });

    it('should format payload string when client secret and reponse are given', () => {
        const CLIENT_SECRET = 'shhhh...its a secret';
        const RESPONSE = 'iaintarobot'

        const expected = `secret=shhhh...its a secret&response=iaintarobot`
        const result = formatPayload(CLIENT_SECRET, RESPONSE);

        expect(result).to.be.equals(expected);
    });
});