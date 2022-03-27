var express = require("express");
var router = express.Router();
const intervenant = require("../models/intervenant");
const intervention = require("../models/intervention");
// Page racine
router.get("/", async function (req, res, next) {
  intervenant.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      intervention.find({}, function (errr, resultat) {
        if (errr) {
          res.send(errr);
        } else {
          res.render("utilisateurs", {
            title: "CodeAlpha",
            interventions: resultat,
            intervenants: result,
          });
        }
      });
    }
  });
});
module.exports = router;
