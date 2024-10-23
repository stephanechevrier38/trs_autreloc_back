'use strict';

const {wintrans, connecterWintrans, deconnecterWintrans, executerSql} = require('./accesWintrans');
const {enteteConsoleLog,log} = require('./logger');
const enteteLog = new enteteConsoleLog("REC","Back", "Stephane","controleur");

const getEtatWintrans = ((req, res) => {
    log("Etat Connexion Wintrans = " + wintrans.etat, enteteLog);
    envoyerResultat(JSON.stringify({wintransEtat:wintrans.etat}),res);
})

const ouvrirWintrans = (async (req, res) => {
    log("tentative connexion wintrans", enteteLog)
    wintrans.etat = await connecterWintrans();
    envoyerResultat(JSON.stringify({wintransEtat:wintrans.etat}),res);
})

const fermerWintrans = (async (req, res) => {
    log("tentative déconnexion wintrans", enteteLog)
    wintrans.etat = await deconnecterWintrans();
    envoyerResultat(String(wintrans.etat),res);
})

const getPays = (async (req, res) => {
    const requete = "SELECT DISTINCT CODE_PAYS " +
                           "FROM LOCALITE " +
                           "WHERE NOID IN (SELECT DISTINCT NOID_LOCALITE FROM AUTRELOC)";
    const pays = JSON.stringify((await executerSql(requete)).rows);
    log("Résultat requête : Pays = " + pays, enteteLog);
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