const {Pool} = require('pg')

const p = new Pool({
    user: "postgres",
    host :"localhost",
    password :"12345678",
    port: "5432",
    database: "test"
    });

module.exports = pools