var qrcode = require("qrcode");
var express = require("express");
const interventions = require("../models/intervention");
const intervenant = require("../models/intervenant");
const nodemailer = require("nodemailer");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  intervenant.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.render("createqr", {
        title: "CodeAlpha",
        saisie: true,
        intervenants: result,
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
    input_salle +
    "\n" +
    input_datePrev +
    "\n" +
    input_heurePrev +
    "\n" +
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
      // logger.error("Error message");
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
        // logger.error("mail pas bien envoyé");
        console.log(error);
      } else {
        // logger.info("mail bien envoyé");
        console.log("Email sent: " + info.response);
      }
    });

    // logger.info(input_identite);

    res.render("createqr", {
      title: "Générateur QR Code",
      saisie: false,
      qr_code: src,
    });
  });
});

module.exports = router;
