const mongoose = require('mongoose')
require('dotenv/config');
mongoose.set('strictQuery',true);
console.log(process.env.DB_URL)
mongoose.connect(
    process.env.DB_URL,
    // {userNewUrlParser: true}, 
    (err)=>{
        if(!err) console.log('Connexion réussie')
        else
            console.log('Erreur de connexion : '+err);
    }
)

module.exports = mongoose;