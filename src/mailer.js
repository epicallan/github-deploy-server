const nodemailer = require('nodemailer');
const { user, pass } = require('./config');

const transporter = nodemailer.createTransport(`smtps://${user}%40gmail.com:${pass}@smtp.gmail.com`);
const listofEmails = ['allan.lukwago@devinit.org', 'epicallan.al@gmail.com'];

const mailOptions = (emails, message, domain) => ({
  from: '"datahub deploy server" <epicallan.al@gmail.com>', // sender address
  to: emails.join(','), // list of receivers
  subject: `Deployment Status for ${domain}`, // Subject line
  text: message, // plaintext body
  html: `<p>${message}</p>` // html body
});

function emailer(msg, domain, callback) {
  const options = mailOptions(listofEmails, msg, domain);
  // send mail with defined transport object
  transporter.sendMail(options, (error, info) => {
    if (error) return console.log(error);
    console.log(`Message sent: ${info.response}`);
    if (callback) callback(error, info);
    return info;
  });
}
module.exports = emailer;
