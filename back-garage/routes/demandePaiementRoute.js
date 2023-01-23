const { request, response } = require('express');
const express = require('express');
const DemandePaiement = require('../models/DemandePaiement');
const router = express.Router();


// demandePaiement
router.post('/',async (request,response)=>{
    
    request.body.listeDemandePaiement.forEach(async dP => {
        const demandePaiement = new DemandePaiement(dP);
        await demandePaiement.save()
        .then(rep=>{
            const reponse = {
                message : 'OK',
                value : rep,
                code :200
            }
            response.json(reponse);
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
        console.log(user)
        const reponse = {
            message : 'OK',
            value : success,
            code : 200
        }
        response.json(reponse)
    });
})
module.exports = router;