const mongoose = require('mongoose');

const Voiture = mongoose.Schema({
    numero:String,
    modele :String,
    dateAjout : {
        type :Date,
    }
})
module.exports = Voiture;