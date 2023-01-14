const mongoose = require('mongoose');

const Voiture = mongoose.Schema({
    numero:String,
    modele :String
})
module.exports = Voiture;