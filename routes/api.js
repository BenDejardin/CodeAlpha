var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Interventions = require("../models/intervention");

/* GET api listing. */

// localhost:3000/intervention/E209/05/04/2022/12:30 AM/1234
router.get("/:salle/:date/:heure/:code", function (req, res, next) {
  let { salle } = req.params;
  let { date } = req.params;
  let { heure } = req.params;
  let { code } = req.params;

  let dateNow = new Date();
  dateNow =
    ("0" + dateNow.getDate()).slice(-2) +
    "/" +
    ("0" + (dateNow.getMonth() + 1)).slice(-2) +
    "/" +
    dateNow.getFullYear();

  let heureNow = new Date();
  heureNow =
    ("0" + heureNow.getHours()).slice(-2) +
    ":" +
    ("0" + heureNow.getMinutes()).slice(-2);

  const filter = {
    salle: salle,
    date_prev: date,
    heure_prev: heure,
    code_intervenant: code,
  };

  Interventions.findOne(
    { salle: salle, code_intervenant: code },
    function (err, result) {
      interventions = result;

      if (interventions.date_deb == "-") {
        const update = { date_deb: dateNow, heure_deb: heureNow };
        Interventions.findOneAndUpdate(filter, update, function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send("Accès autorisé à la salle ");
          }
        });
      } else {
        const update = {
          date_fin: dateNow,
          heure_fin: heureNow,
          etat: "Terminé",
        };
        Interventions.findOneAndUpdate(filter, update, function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send("Accès autorisé à la salle ");
          }
        });
      }
    }
  );
});

module.exports = router;
