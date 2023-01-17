const { request, response } = require('express');
const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const Piece = require('../models/Piece');

router.get('/:idPiece', (req, res) => {
    Piece.find({_id:req.params.idPiece},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur : ' + JSON.stringify(err, undefined, 2)); }
    });
});