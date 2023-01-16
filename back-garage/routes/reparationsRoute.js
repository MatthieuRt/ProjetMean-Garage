const { request, response } = require('express');
const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


const Utilisateur = require('../models/Utilisateur');
const ReparationsVoiture = require('../models/ReparationsVoiture');



router.get('/', (req, res) => {
    ReparationsVoiture.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/insert', (req, res) => {
    var rep = new ReparationsVoiture({
        idVoiture: req.body.idVoiture,
        idUtilisateur: req.body.idUser,
        listeReparation : [],
        dateArrivee:new Date(),
        dateSortie:null,
        estDepose:false
    });
    rep.save((err, doc) => {
        let rep = {}
        if (!err) {
            rep = {
                message : 'OK',
                code :200,
                value : doc
            }
        }
        else {
            rep = {
                message : 'KO',
                code :404,
                value : err
            } 
            console.log('Erreur : ' + err) 
        }
        console.log('_______________________Depot voiture_____________________________');
        console.log(rep);
        res.json(rep); 

    });
});

router.put('/add/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id :' + (req.params.id));
    var reparation = {
        listeReparation : [{
            idPiece:req.body.idPiece,
            prix:req.body.prix,
            avancement:req.body.avancement,
            estPaye:false,
            datePaiement:null,
            dateDebut:req.body.dateDebut,
            dateFin:null
        }],
    };
    ReparationsVoiture.findByIdAndUpdate(req.params.id, { $push: reparation }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee update : '+JSON.stringify(err,undefined,2)); }
    });
});

router.get('/enCours/:id', (req, res) => {
    ReparationsVoiture.find({idUtilisateur:req.params.id,dateSortie:null,estDepose:true},{listeReparation:1},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/historique/:idUser/:idVoiture', (req, res) => {
    ReparationsVoiture.find({idUtilisateur:req.params.idUser,idUtilisateur:req.params.idUtilisateur},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur : ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/get/:id',(req,res)=>{
    ReparationsVoiture.find({_id:req.params.id},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;