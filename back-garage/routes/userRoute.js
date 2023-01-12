const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Utilisateur = require('../models/Utilisateur');

router.post('/inscription',(request,response)=>{
    const user = new Utilisateur({
        identfiant : request.body.identfiant,
        motDePasse : request.body.motDePasse,
        mail : request.body.mail,
    })
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'garagenotificiation@gmail.com',
            pass: 'xmfqlhsxkgslrbdp'
        }
    });
    // var body = '<h1>Bonjour!</h1><p>Veuillez confirmer par cette email la création de votre compte</p>'
    // var body ='<h1>Bonjour!</h1><p>Veuillez confirmer par cette email la création de votre compte</p><p><a href=\'localhost:9000/user/confirmation/'+data._id+'\'> cliquer ici '+data._id+'!</a></p>'; 

    user.save()
        .then(data=>{
            var body = '<h1>Bonjour!</h1><p>Veuillez cliquer ici pour confirmer la création de votre compte <a href="http://localhost:9000/user/confirmation/'+data._id+'">here</a> to visit our website</p>'; 
            let mailOptions = {
                to: 'andrianmattax@gmail.com',
                subject: 'Email de confirmation de création de compte',
                html: body
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
        .catch(err=>{
            console.log(err)
        })
   
    
})
router.get('/confirmation/:id',async (request,response)=>{
    console.log(request.params.id)
    try {
        await Utilisateur.updateOne(
            { _id: request.params.id }, 
            {$set : {valid:true}}
        )

    } catch (error) {
        response.json({code : 404,message : error});
    }
})
module.exports = router;