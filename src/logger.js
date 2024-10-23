'use strict';

class enteteConsoleLog {
  constructor(env,app, user,fichier) {
    this.env = env;
    this.app = app;
    this.user = user;
    this.fichier = fichier;
  }
}

const tailleEnteteLog = 51;

function log(message,entete) {
  let enteteLog;
  switch (arguments.length) {
    case 1 :
      enteteLog = new Date().toLocaleString() + "[Pas d'entête]";
      break;
    case 2 :
      enteteLog = new Date().toLocaleString() +
        "[" + entete.app + ","+ entete.env + "," + entete.user + "," + entete.fichier +  "]: ";
      break;
    default:
      enteteLog =
        "Erreur de paramétrage lors de l'appel de la fonction log(). ";
  }
  if (enteteLog.length > tailleEnteteLog) {
    enteteLog = enteteLog.substring(0,tailleEnteteLog-4) + "..]: ";
  } else {
    enteteLog = enteteLog + " ".repeat(tailleEnteteLog - enteteLog.length + 1);
  }
  console.log(enteteLog+message);
}

module.exports = {enteteConsoleLog,log}
