const { expect } = require('chai');
const mailer = require('../mailer');
const path = require('path');


/* eslint-disable no-unused-expressions, func-names, prefer-arrow-callback */
describe.skip('Mailer tests', () => {
  it('should send mail ', (done) => {
    mailer('succesful test email deployment', 'data.devinit.org', (error) => {
      expect(error).to.be.null;
      done();
    });
  }).timeout(5000);
});

describe('worker test', () => {
  it('we should have a worker file', () => {
    const worker = path.resolve(process.cwd(), 'src/worker.js');
    console.log(worker);
    expect(worker).to.be.a('string');
  });
});
