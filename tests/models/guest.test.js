const chai = require('chai');
const { expect } = chai;

const Guest = require('../../src/models/guest');

describe('[Model] Guest', () => {

    let guest;

    before(()=>{
        guest = new Guest({
            name: 'John'
        });
    });

    it('should not be null', () => {
        expect(guest).to.not.be.null;
    })

    it('should generate a short id', () => {
        expect(guest._id).to.not.be.null;
        expect(guest._id.length).to.be.lessThan(8);
    });
});
