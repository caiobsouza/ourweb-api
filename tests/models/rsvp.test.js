const chai = require('chai');
const { expect } = chai;
const mongoose = require('mongoose');


const Rsvp = require('../../src/models/rsvp');

describe('[Model] Rsvp', () => {

    let rsvp;

    before(() => {
        rsvp = new Rsvp({
            name: 'John',
            email: 'john.doe@mail.com',
            confirmed: true
        });
    });

    it('should not be null', () => {
        expect(rsvp).to.not.be.null;
    });

    it('should have a regular ObjectId', () => {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(rsvp._id);
        expect(isValidObjectId).to.be.true;
    });

    it('should have a name property', () => {
        expect(Rsvp.schema.obj).to.haveOwnProperty('name');
    });

    it('should have a confirmed property', () => {
        expect(Rsvp.schema.obj).to.haveOwnProperty('confirmed');
    });

    it('should have a confirmed property', () => {
        expect(Rsvp.schema.obj).to.haveOwnProperty('email');
    });
});
