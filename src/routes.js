const express = require('express');
const router = express.Router();

const  {
    getEtatWintrans,
    ouvrirWintrans,
    fermerWintrans,
    getPays
} = require('./controleur.js');

router.get("/wintrans/etat", getEtatWintrans);
router.post("/wintrans/ouvrir", ouvrirWintrans);
router.post("/wintrans/fermer", fermerWintrans);
router.get("/localite/pays", getPays);

module.exports = router;
