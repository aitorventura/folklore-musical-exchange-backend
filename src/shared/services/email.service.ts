
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {
  }

  sendWelcomeEmail(to: String, name: string) {
    console.log("Entro en el metodo")
    var transporter = initialize();

    var mailOptions = {
      from: 'folkloremusicalexchange@gmail.com',
      to: to,
      subject: 'Bienvenid@ a Folklore Musical Exchange',
      html: `<h1>Bienvenid@</h1><p>Hola ${name}, </p><p>Muchas gracias por registrarte en nuestra plataforma, esperamos que sea de tu agrado.</p><p> ¡Un fuerte saludo! </p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Fallo al enviar")
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }


  sendNewMusicalExchangeEmail(listEmails: string[], mgroupA: string, mgroupB: string) {
    var transporter = initialize();

    for (var email of listEmails) {
      var mailOptions = {
        from: 'folkloremusicalexchange@gmail.com',
        to: email,
        subject: 'Nuevo intercambio musical',
        html: `<h1>¡Nuevo intercambio musical!</h1><p>Hola, </p><p>Se ha creado un nuevo intercambio musical entre ${mgroupA} y ${mgroupB}, no dudes en visitar el listado de intercambios de nuestra plataforma para no perderte ninguno.</p><p> ¡Un fuerte saludo!, El equipo de Folklore Musical Exchange </p>`
      };

      console.log(mailOptions)

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }


  }

  sendNewGroupOfType(listEmails: string[], nameAgrupation: string, nameType: string) {
    console.log(listEmails)
    console.log(nameAgrupation)
    console.log(nameType)
    console.log("Entro aqui")
    var done = true;
    if (!listEmails || listEmails.length === 0) {
      done = false;
    }
    if (done) {
      var transporter = initialize();

      for (var email of listEmails) {
        var mailOptions = {
          from: 'folkloremusicalexchange@gmail.com',
          to: email,
          subject: 'Nueva agrupación musical',
          html: `<h1>¡Nueva agrupación musical!</h1><p>Hola, </p><p>Se ha creado una nueva agrupación musical llamada ${nameAgrupation} del tipo ${nameType}, no dudes en visitar el listado de agrupaciones de nuestra plataforma para estar al corriente de todas las nuevas agrupaciones.</p><p> ¡Un fuerte saludo!, El equipo de Folklore Musical Exchange </p>`
        };

        console.log(mailOptions)

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }

    }
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

