const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Modele Collection Intervention
const Intervention = new Schema({
  code_intervenant: String,
  salle: String,
  date_prev: String,
  heure_prev: String,
  date_deb: String,
  heure_deb: String,
  date_fin: String,
  heure_fin: String,
  etat: String,
});

module.exports = mongoose.model("Intervention", Intervention);
