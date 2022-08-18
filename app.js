const express = require("express")
const app = express()
const path = require("path")

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/tarefas", (req, res) => {
  getTarefas().then((result) => {
    res.json(result)
  })
})

app.get("/criar", (req, res) => {
  res.sendFile(path.join(__dirname, "criar_tarefa.html"))
})

app.post("/criar", (req, res) => {
  let formData = req.body
  salvarTarefa(formData).then(() => {
    res.redirect("/")
  })
})

app.listen(5000, () => {
  console.log("Server rodando na porta 5000")
})

const getTarefas = () => {
  const conn = require("./db_connection")
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM tarefas;", function (err, result, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const salvarTarefa = (formData) => {
  const conn = require ("./db_connection")
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO tarefas (tarefa, data) VALUES (?, ?)", [formData["tarefa"], formData["data"]], (err, result, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}