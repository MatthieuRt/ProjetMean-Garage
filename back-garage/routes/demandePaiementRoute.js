const { request, response } = require('express');
const express = require('express');
const DemandePaiement = require('../models/DemandePaiement');
const router = express.Router();


// demandePaiement
router.post('/',async (request,response)=>{
    let counter = 0;
    request.body.listeDemandePaiement.forEach(async dP => {
        const demandePaiement = new DemandePaiement(dP);
        await demandePaiement.save()
        .then(rep=>{
            counter++;
            if(counter === request.body.listeDemandePaiement.length){
                const reponse = {
                    message : 'OK',
                    value : rep,
                    code :200
                }
                response.json(reponse);
             }//else{
            //     const reponse = {
            //         message : 'KO',
            //         value : request.body.listeDemandePaiement[i].idReparation +' n\'a pas été inserer',
            //         code :404
            //     }
            //     response.json(reponse);
            // }
        })
        .catch(err=>{
            const reponse ={
                message : 'KO',
                value : err,
                code :404
            }
            response.json(reponse);
            console.log(err)
        })
    });
    
    
})


//liste demande paiement en attente
router.get('/pendingValidation',(request,response)=>{
    DemandePaiement.find((err,success) => {
        if(err){
            const rep = {
                message : 'KO',
                code : 404,
                value :  err
            }
            response.json(rep);
        }
        // console.log(success)
        const reponse = {
            message : 'OK',
            value : success,
            code : 200
        }
        response.json(reponse)
    });
})
//liste demande paiement en attente par idVoiture
router.get('/pendingValidation/:idVoiture',(request,response)=>{
    DemandePaiement.find({idVoiture: request.params.idVoiture},(err,success) => {
        if(err){
            const rep = {
                message : 'KO',
                code : 404,
                value :  err
            }
            response.json(rep);
        }
        // console.log('_______________________________________Liste demande paiement voiture_______________________________________')
        // console.log(success)
        const reponse = {
            message : 'OK',
            value : success,
            code : 200
        }
        response.json(reponse)
    });
})
module.exports = router;