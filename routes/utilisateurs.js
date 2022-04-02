var express = require("express");
var router = express.Router();
const Intervenants = require("../models/intervenant");
const Interventions = require("../models/intervention");
// Page racine
router.all("/", async function (req, res, next) {
  let input_code = req.body.code;
  let input_etat = req.body.etat;
  Intervenants.find({}, function (err, resultat) {
    Interventions.aggregate([
      {
        $lookup: {
          from: "intervenants",
          localField: "code_intervenant",
          foreignField: "code",
          as: "intervenants",
        },
      },
    ]).exec((err, result) => {
      if (err) {
        console.log("error", err);
      }
      if (result) {
        console.log(result[0]);
        if (input_code != null) {
          interventions = [];
          for (let index = 0; index < result.length; index++) {
            if (result[index].code_intervenant == input_code) {
              interventions.push(result[index]);
            }
          }
        } else {
          interventions = result;
          input_etat = "Aucun";
        }

        // result = [
        //   {
        //     _id: new ObjectId("623dbd2e6b3676be9bd0fddd"),
        //     code_intervenant: "123",
        //     salle: "E204",
        //     date_prev: "29/03/2022",
        //     heure_prev: "12:30 AM",
        //     date_deb: "-",
        //     heure_deb: "-",
        //     date_fin: "-",
        //     heure_fin: "-",
        //     etat: "En Cours",
        //     __v: 0,
        //     intervenants: [
        //       {
        //         _id: "123",
        //         nom: "Elise",
        //         prenom: "Axel",
        //         code: "123",
        //         adresse_mail: "axelelise974@gmail.com",
        //         poste: "Ingenieur",
        //       },
        //     ],
        //   },
        // ],

        res.render("utilisateurs", {
          title: "CodeAlpha",
          interventions: interventions,
          intervenants: resultat,
          etat: input_etat,
        });
      }
    });
  });
});

module.exports = router;
