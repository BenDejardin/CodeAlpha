var qrcode = require("qrcode");
var express = require("express");
const interventions = require("../models/intervention");
const intervenant = require("../models/intervenant");
const salles = require("../models/salle");
const nodemailer = require("nodemailer");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  intervenant.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      salles.find({}, function (err, resultat) {
        if (err) {
          res.send(err);
        } else {
          res.render("createqr", {
            title: "CodeAlpha",
            intervenants: result,
            saisie: true,
            salles: resultat,
          });
        }
      });
    }
  });
});

router.post("/scan", (req, res, next) => {
  let input_salle = req.body.salle;
  let input_datePrev = req.body.datePrev;
  let input_heurePrev = req.body.heurePrev;
  let input_code = req.body.code;
  let contenuQR =
    "http://localhost:3000/api/" +
    input_salle +
    "/" +
    input_datePrev +
    "/" +
    input_heurePrev +
    "/" +
    input_code;

  const intervention = new interventions({
    code_intervenant: input_code,
    salle: input_salle,
    date_prev: input_datePrev,
    heure_prev: input_heurePrev,
    date_deb: "-",
    heure_deb: "-",
    date_fin: "-",
    heure_fin: "-",
    etat: "En Cours",
  });

  intervention.save((err, result) => {
    if (err) console.log(err);
    console.log(result);
  });

  // Envoi du QR par mail
  qrcode.toDataURL(contenuQR, (err, src) => {
    if (err) {
      res.send("Un problème est survenu !!!");
    }

    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6c804eb4b2c02f",
        pass: "b59ed67eb9c328",
      },
    });

    let mailOptions = {
      from: "qrident@exemple.com",
      to: input_code + "@gmail.com",
      subject: "QRCode",
      text: "Envoi de QRCode",
      html: 'QRCode de "' + input_code + '" : <img src="' + src + '"/>',
      attachments: [
        {
          filename: src,
          cid: src, // Mettre à l'identique img src
        },
      ],
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.render("createqr", {
      title: "Générateur QR Code",
      saisie: false,
      qr_code: src,
    });
  });
});

module.exports = router;
