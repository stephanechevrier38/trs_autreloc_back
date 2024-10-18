'use strict';

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const products_routes = require('./src/routes.js');

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});

app.use(express.json());
app.use(cors());
app.use('/', products_routes);