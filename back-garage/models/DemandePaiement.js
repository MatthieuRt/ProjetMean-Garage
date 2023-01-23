const mongoose = require('mongoose');
const Piece = require('./Piece');
const demandePaiementSchema = mongoose.Schema({
    idReparation:String,
    totalDue : String,
    piece : Piece,
    date : {
        type : Date
    }
});

module.exports = mongoose.model('DemandePaiement',demandePaiementSchema);