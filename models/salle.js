const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Modele Collection Intervention
const Salle = new Schema({
  nom: String,
});

module.exports = mongoose.model("Salle", Salle);
