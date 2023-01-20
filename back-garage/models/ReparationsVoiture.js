const mongoose = require('mongoose');

const reparationsVoitureSchema = mongoose.Schema({
    idUtilisateur:String,
    idVoiture:String,
    listeReparation :[
        {
            idPiece:String,
            prix:Number,
            avancement:String,
            description:String,
            estPaye:Boolean,
            datePaiement:Date,
            dateDebut:Date,
            dateFin:Date
        }
    ],
    dateArrivee:Date,
    dateSortie:Date,
    estDepose:Boolean,
    etat:{
        type:String,
        default:"Non traité"
    }
})
module.exports = mongoose.model('ReparationsVoiture',reparationsVoitureSchema);