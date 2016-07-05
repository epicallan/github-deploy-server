const { expect } = require('chai');
const mailer = require('../mailer');
/* eslint-disable no-unused-expressions, func-names, prefer-arrow-callback */
describe('Mailer tests', () => {
  it.skip('should send mail ', (done) => {
    mailer('succesful test email deployment', 'data.devinit.org', (error) => {
      expect(error).to.be.null;
      done();
    });
  }).timeout(5000);
});
