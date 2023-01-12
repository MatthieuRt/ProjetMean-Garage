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
    let mailOptions = {
        to: 'andrianmattax@gmail.com',
        subject: 'Email de confirmation de création de compte',
        html: '<h1>Bonjour!</h1><p>Veuillez confirmer par cette email la création de votre compte</p>'+'\n'
            +'<p><a href=""> cliquer ici!</a></p>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
})
module.exports = router;