
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor( )  {
  }

  sendWelcomeEmail(to:String, name:string) {
    console.log("Entro en el metodo")
    var transporter = initialize();

    var mailOptions = {
        from: 'folkloremusicalexchange@gmail.com',
        to: to,
        subject: 'Bienvenid@ a Folklore Musical Exchange',
        html: `<h1>Bienvenid@</h1><p>Hola ${name}, </p><p>Muchas gracias por registrarte en nuestra plataforma, esperamos que sea de tu agrado.</p><p> ¡Un fuerte saludo! </p>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
   
  }

 
}



function initialize() {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'folkloremusicalexchange@gmail.com',
            pass: 'fme2020!' //Ocultar
        }
    });
    return transporter;
}

