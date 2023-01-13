const { request, response } = require('express');
const express = require('express');
const router = express.Router();

const Utilisateur = require('../models/Utilisateur');
const ReparationsVoiture = require('../models/ReparationsVoiture');

router.get('/', (req, res) => {
    ReparationsVoiture.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error  in retrieving employees : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;