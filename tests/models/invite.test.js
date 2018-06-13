const chai = require('chai');
const { expect } = chai;

const Invite = require('../../src/models/invite');

describe('[Model] Invite', () => {
    let invite;

    before(() => {
        invite = new Invite({
            title: 'An Invite Title',
            description: 'Some description text',
            guests: []
        });
    });

    it('should generate a short id', () => {
        expect(invite._id).to.not.be.null;
        expect(invite._id.length).to.be.lessThan(8);
    });

    it('should not be null', () => {
        expect(invite).to.be.not.null.and.not.undefined;
    });

    it('should store title and description correctly', () => {
       expect(invite.title).to.be.equals('An Invite Title');
       expect(invite.description).to.be.equals('Some description text');
    });

    it('should have a property called \'sent\' and its default should be false', () => {
       expect(invite._doc).to.haveOwnProperty('sent');
       expect(invite.sent).to.be.false;
    });
});