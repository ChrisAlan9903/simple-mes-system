const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mes_system",
  password: "root", // Change this to your password
  port: 5432,
});

module.exports = pool;
