require('dotenv').config()
const mysql = require('mysql2')

const conn = mysql.createConnection({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE
})

conn.connect(function(err) {
  if (err) throw err;
  console.log("Conectado ao banco de dados")
})

module.exports = conn