const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Utilisateur = require('../models/Utilisateur');
const ConfirmCompte = require('../models/ConfirmCompte');

// inscription de l'utilisateur pour créer un nouveau compte
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
    //check compte s'il existe déjà
    Utilisateur.find({mail : user.mail} , (err,userExist)=>{
        //si utilisateur n'existe pas encore
        if(userExist.length==0){
            user.save()
            .then(data=>{
                const uuid = new ConfirmCompte({
                    userId : data._id,
                })
                uuid.save()
                    .then(code=>{
                        var body = '<h1>Bonjour,</h1><p>Nous avons reçu une demande de création de compte pour cette adresse e-mail.</p><p> Pour compléter la création de votre compte, veuillez entrer le code de confirmation suivant : '+code._id+'sur notre site web.</p> \n'
                        +'<p>Merci d\'avoir utiliser notre service.</p><p>Cordialement,</p> <p>L\'équipe de notre service</p>';
                        let mailOptions = {
                            to: 'andrianmattax@gmail.com',
                            subject: 'Email de confirmation de création de compte',
                            html: body
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                console.log(error);
                            } else {
                                const rep = {
                                    message : 'OK',
                                    value : null,
                                    code : 200
                                }
                                response.json(rep);
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    })
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
        // utilisateur existe déja avec compte déja activé
        else if(userExist.valid){
            const rep = {
                message : 'KO',
                erreur :'l\'email appartient déjà à un compte existant.',
                value : null,
                code:404
            }
        }
        else{
            const rep = {
                message : 'KO',
                value :'/confirmation-required',
                code:404
            }
        }

    })   
    
})
// confirmation compte utilisateur par email
router.post('/confirmation',async (request,response)=>{
    console.log(request.body.code)
    let rep = {}
    try {
        ConfirmCompte.find({_id : request.body.code},async (err,confirmUser)=>{
            if(err){
                rep ={
                    message : 'KO',
                    code:404,
                    value : err
                }
            }
            const updatedUser = await Utilisateur.updateOne(
                { _id: confirmUser.userId}, 
                {$set : {valid:true}},(err,up)=>{
                    if(up){
                        ConfirmCompte.deleteOne({_id:confirmUser._id})
                    }
                }
            )
            rep = {
                message : 'OK',
                value : updatedUser,
                code : 200
            }
        })
        
        response.json(rep);
    } catch (error) {
        response.json({code : 404,message : error});
    }
})
// connexion utilisateur
router.post('/login',(request,response)=>{
    console.log({mail : request.body.mail, motDePasse: request.body.password,valid:true})
    Utilisateur.find({mail : request.body.mail, motDePasse: request.body.password},(err,user)=>{
        if(err){
            const rep = {
                message : 'KO',
                code : 404,
                value :  err
            }
            response.send(rep);
        }
        else if(user.length==0){
            const reponse = {
                message : 'KO',
                value : 'Votre email ou votre mots de passe est incorrect',
                code : 404
            }
            response.json(reponse)
        }
        console.log(user)
        const reponse = {
            message : 'OK',
            value : user,
            code : 200
        }
        response.json(reponse)
        console.log('----------------------------------------------------')
        console.log(reponse);
    })
})
module.exports = router;