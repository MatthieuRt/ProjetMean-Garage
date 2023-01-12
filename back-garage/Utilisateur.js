const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom : String,
    adress : String,

})
module.exports = mongoose.model('Nom',maisonSchema);