require('dotenv').config()
let mysql = require('mysql2')

let conn = mysql.createConnection({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE
})

conn.connect(function(err) {
  if (err) throw err;
  console.log("Conectado")
})