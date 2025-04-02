const { Pool } = require("pg");
const fs = require('fs');
const path = require('path');

const sslPath = path.join(__dirname, '..', 'ssl', 'ca.crt');

const pool = new Pool({
  connectionString: "postgresql://postgres:2X2USR761GAhsC76@subjectively-valued-schnauzer.data-1.use1.tembo.io:5432/postgres",
  ssl: {
		ca: fs.readFileSync(sslPath).toString(),
	}
});

async function query(queryString, params, callback) {
  return pool.query(queryString, params, callback);
}

module.exports = {query};