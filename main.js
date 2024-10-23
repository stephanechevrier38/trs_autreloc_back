'use strict';

const {enteteConsoleLog,log} = require('./src/logger');

const enteteLog = new enteteConsoleLog("REC","Back", "Stephane","main");
const express = require("express");
const back = express();
const cors = require("cors");
const port = 3000;

const products_routes = require('./src/routes.js');

back.listen(port, () => {
    log("Appli Back écoute sur le port " + port,enteteLog);
});

back.use(express.json());
back.use(cors());
back.use('/', products_routes);