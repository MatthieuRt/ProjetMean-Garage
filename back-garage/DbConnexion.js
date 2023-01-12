const mongoose = require('mongoose')
require('dotenv/config');
mongoose.connect(
    process.env.DB_CONNEXION,
    {userNewUrlParser: true}, 
    (err)=>{
        if(!err) console.log('Connexion réussie')
        else
            console.log('Erreur : '+JSON.stringify(err,undefined,2));
    }
)
module.exports = mongoose;