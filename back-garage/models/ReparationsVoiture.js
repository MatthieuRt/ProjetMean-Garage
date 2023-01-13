const mongoose = require('mongoose');

const reparationsVoitureSchema = mongoose.Schema({
    idVoiture:String,
    designation:String,
    debutReparation: Date, 
    finReparation: Date,
    listeReparation :[
        {
            idPiece:String,
            prix:Number,
            avancement:String,
            estPaye:Boolean,
            datePaiement:Date,
            dateDebut:Date,
            dateFin:Date
        }
    ],
    dateArrivee:Date,
    dateSortie:Date

})
module.exports = mongoose.model('ReparationsVoiture',reparationsVoitureSchema);