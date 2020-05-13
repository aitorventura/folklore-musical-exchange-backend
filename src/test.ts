
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'folkloremusicalexchange@gmail.com',
    pass: 'fme2020!'
  }
});

var mailOptions = {
  from: 'folkloremusicalexchange@gmail.com',
  to: 'aitorventura6@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});