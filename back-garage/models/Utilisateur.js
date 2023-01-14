const mongoose = require('mongoose');

const Voiture = mongoose.Schema({
    numero:String,
    modele :String
})
const userSchema = mongoose.Schema({
    identifiant:String,
    motDePasse:String,
    mail: String, 
    listeVoiture :[Voiture],
    profil:{
        type:String,
        default : 'user'
    }, 
    valid: {
        type:Boolean,
        default : false
    }

})
module.exports = mongoose.model('Utilisateur',userSchema);