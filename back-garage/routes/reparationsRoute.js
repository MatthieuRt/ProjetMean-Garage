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
    rep.save()
            .then(async success=> {
                let rep = {
                    message : 'OK',
                    code :200,
                    value : success
                }
                console.log('_______________________Depot voiture SUCCES_____________________________');
                console.log(success);

                const utilisateur = await Utilisateur.findById(success.idUtilisateur);
                console.log('**************************************************')
                console.log(utilisateur);
                console.log('**************************************************')

                const voitureToUpdate=  utilisateur.listeVoiture.find(voiture => voiture._id==success.idVoiture);
                voitureToUpdate.enCoursDepot = false;
                utilisateur.save()
                    .catch(diso=>{
                        console.log('___________________UPDATE enCoursDepot ERREUR___________________');
                        let rep = {
                            message : 'KO',
                            code :404,
                            err :'erreur de changement d\' en cours de dépot',
                            value : diso
                        } 
                        res.json(rep); 
                        console.log('Erreur : ' + diso) 
                    })
                console.log(rep);
                res.json(rep); 
            })
            .catch(erreur=>{
                let rep = {
                    message : 'KO',
                    code :404,
                    value : erreur
                } 
                console.log('_______________________Depot voiture ERREUR_____________________________');
                res.json(rep); 
                console.log('Erreur : ' + erreur) 
            })
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
        let response = {}
        if (!err) {
            response = {
                message : 'OK',
                value : docs,
                code : 200
            }
            res.json(response)
        }
        else {
            console.log('Erreur : ' + JSON.stringify(err, undefined, 2));
            response = {
                message : 'KO',
                code : 404,
                value :  err
            }
            res.json(response); 
        }
    });
});

router.get('/get/:id',(req,res)=>{
    ReparationsVoiture.find({_id:req.params.id},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Erreur : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;