const nodemailer = require('nodemailer');

const transporterOptions = {
  host: 'smtp.umbler.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_SECRET
  }
};

module.exports = nodemailer.createTransport(transporterOptions);
