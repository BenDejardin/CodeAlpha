const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Modele Collection Intervenant
const Intervenant = new Schema({
  nom: String,
  prenom: String,
  code: String,
  adresse_mail: String,
  poste: String,
});
module.exports = mongoose.model("Intervenant", Intervenant);
