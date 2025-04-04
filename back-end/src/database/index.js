const { Pool } = require("pg");

const dotenv = require('dotenv').config()
const fs = require('fs');
const path = require('path');

const dbURL = process.env.DB_URL
const sslPath = path.join(__dirname, '..', 'ssl', 'ca.crt');

const pool = new Pool({
  connectionString: dbURL,
  ssl: {
		ca: fs.readFileSync(sslPath).toString(),
	}
});

async function query(queryString, params, callback) {
  return pool.query(queryString, params, callback);
}

module.exports = {query};