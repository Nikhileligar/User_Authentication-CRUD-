const {createPool} = require("mysql");
const pool = createPool({
    port:process.env.DBPORT,
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBDATABASE,
    connectionLimit:10
});

module.exports = pool;