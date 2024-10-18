'use strict';

const {wintrans, connecterWintrans, deconnecterWintrans, executerSql} = require('./AccesWintrans');

const getEtatWintrans = ((req, res) => {
    console.log("Etat Connexion Wintrans = " + wintrans.etat);
    envoyerResultat(JSON.stringify({wintransEtat:wintrans.etat}),res);
})

const ouvrirWintrans = (async (req, res) => {
    console.log("tentative connexion wintrans")
    await connecterWintrans();
    console.log("Etat Connexion Wintrans après ouverture = " + wintrans.etat);
    envoyerResultat(JSON.stringify({wintransEtat:wintrans.etat}),res);
})

const fermerWintrans = (async (req, res) => {
    await deconnecterWintrans();
    console.log("Etat Connexion Wintrans après fermeture = " + wintrans.etat);
    envoyerResultat(String(wintrans.etat),res);
})

const getPays = (async (req, res) => {
    const requete = "SELECT DISTINCT CODE_PAYS " +
                           "FROM LOCALITE " +
                           "WHERE NOID IN (SELECT DISTINCT NOID_LOCALITE FROM AUTRELOC)";
    const pays = JSON.stringify((await executerSql(requete)).rows);
    console.log("Résultat requête : Pays = " + pays);
    envoyerResultat(pays,res);
})

function envoyerResultat(resultat,res) {
    if (resultat !== undefined) {
        res.status(200).setHeader('Content-Type', 'application/json').send(resultat);
    } else {
        res.status(400).setHeader('Content-Type', 'application/json').send(undefined);
    }
}

module.exports = {getEtatWintrans,ouvrirWintrans,fermerWintrans,getPays}