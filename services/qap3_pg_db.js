// file to connect to the data base

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fullstack_qap3_db",
  password: "Optical81101",
  port: 5432,
});

module.exports = pool;
