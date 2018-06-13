const chai = require('chai');
const { expect } = chai;
const mongoose = require('mongoose');


const Guest = require('../../src/models/guest');

describe('[Model] Guest', () => {

    let guest;

    before(() => {
        guest = new Guest({
            name: 'John'
        });
    });

    it('should not be null', () => {
        expect(guest).to.not.be.null;
    });

    it('should have a regular ObjectId', () => {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(guest._id);
        expect(isValidObjectId).to.be.true;
    });
});
