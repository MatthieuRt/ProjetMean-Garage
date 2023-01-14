const { request, response } = require('express');
const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const Utilisateur = require('../models/Utilisateur');
const ReparationsVoiture = require('../models/ReparationsVoiture');

router.get('/', (req, res) => {
    ReparationsVoiture.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error  in retrieving employees : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/insert', (req, res) => {
    var rep = new ReparationsVoiture({
        idVoiture: "test",
        listeReparation : [{
            idPiece:"String",
            prix:0,
            avancement:"String",
            estPaye:false,
            datePaiement:"2023-01-14 13:05:22",
            dateDebut:"2023-01-14 13:05:22",
            dateFin:"2023-01-14 13:05:22"
        }],
        dateArrivee:"2023-01-14 13:05:22",
        dateSortie:"2023-01-14 13:05:22"
    });
    rep.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error  in retrieving employees : ' + JSON.stringify(err, undefined, 2)) }
    });
});

router.put('/add/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :' + (req.params.id));
    var reparation = {
        listeReparation : [{
            idPiece:"updated",
            prix:0,
            avancement:"updated",
            estPaye:false,
            datePaiement:"2023-01-14 13:05:22",
            dateDebut:"2023-01-14 13:05:22",
            dateFin:"2023-01-14 13:05:22"
        }],
    };
    ReparationsVoiture.findByIdAndUpdate(req.params.id, { $set: reparation }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee update : '+JSON.stringify(err,undefined,2)); }
    });
});

module.exports = router;