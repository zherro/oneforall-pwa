// lib/nodemailer.js
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // ou outro serviço de email
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: path.resolve('./src/templates/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./src/templates/'),
  extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions));

export default transporter;
