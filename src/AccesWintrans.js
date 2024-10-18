'use strict';

const oracledb = require('oracledb');

const config = {
    user:           "URIOS_INF",
    password:       "VALIDU",
    connectString:  "192.168.1.27:1526/URIOS",    // Recette
    // connectString:  "192.168.1.31:1526/URIOS",    // Production
}

// le module oracledb en mode thin ne fonctionne pas avec la version 11g de la Bdd Wintrans
// pour le faire fonctionner avec la version 11g d'Oracle, il faut utiliser le mode "epais" avec un Client Oracle recent
// Quand wintrans sera en version 12, Client Oracle et la lignea ci-dessous ne devrait plus etre necessaire
const pathOracleClient = { libDir: "C:/appl/Urios/instantclient_23_5" };

const wintrans = {
    connexion : {},
    etat :      0
}

async function connecterWintrans() {
    try {
        // Quand wintrans sera en version 12, Client Oracle et la lignea ci-dessous ne devrait plus etre necessaire
        oracledb.initOracleClient(pathOracleClient);
        wintrans.connexion = await oracledb.getConnection(config);
        wintrans.etat = 1;
        console.log("Connexion wintrans Ok");
    } catch (e) {
        console.log('Erreur dans fonction AccessWintrans.ouvrirWintrans() : ' + e);
        wintrans.etat = -1;
    }
}

async function deconnecterWintrans() {
    try {
        await wintrans.connexion.close();
        wintrans.etat = 0;
    } catch (e) {
        console.log('Erreur dans fonction AccessWintrans.fermerWintrans() : ' + e);
        wintrans.etat = -1;
    }
}

async function executerSql(requete) {
    try {
        debugger;
        return await wintrans.connexion.execute(requete, [], {outFormat: oracledb.OUT_FORMAT_OBJECT});
    } catch (e) {
        console.log('Erreur dans fonction AccessWintrans.executerSql() : ' + e);
        return {};
    }
}

module.exports = {wintrans,connecterWintrans,deconnecterWintrans,executerSql};