
// myscript.js
'use strict';

import * as dbConfig from './dbconfig.js';
import oracledb from 'oracledb';
// import {config} from "./dbConfig";
// const config= require('./dbconfig.js');
console.log(dbConfig.config);

Error.stackTraceLimit = 50;

// const oracledb = require('oracledb');


// const pathOracleClient = require('./dbconfig.js');
oracledb.initOracleClient(dbConfig.pathOracleClient);
// console.log(pathOracleClient);

async function run() {


    const connection = await oracledb.getConnection(dbConfig.config);

    const result = await connection.execute(
        'SELECT DISTINCT CODE_PAYS ' +
        'FROM LOCALITE ' +
        'WHERE NOID IN (SELECT DISTINCT NOID_LOCALITE FROM AUTRELOC)'
        // `SELECT manager_id, department_id, department_name
        //  FROM departments
        //  WHERE manager_id = :id`,
        // [103],  // bind value for :id
    );
    console.log(result.rows);
    await connection.close();
}

run();