const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    identifiant:String,
    motDePasse:String,
    mail: String, 
    listeVoiture :[
        {
            numero:String,
            modele:String
        }
    ],
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