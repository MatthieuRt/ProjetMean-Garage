const mongoose = require('mongoose');
const Voiture = require('./Piece');
const pieceSchema = mongoose.Schema({
    designation:String,
    prix:number
})
module.exports = mongoose.model('Piece',userSchema);