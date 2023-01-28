const { request, response } = require('express');
const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;


const Benefice = require('../models/Benefice');


router.get('/',(req,res)=>{
    Benefice.find((err,docs)=>{
        if (!err) { res.send(docs); }
        else { console.log('Erreur : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;

