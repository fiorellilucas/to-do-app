const express = require("express")
const app = express()
const path = require("path")
const { body, validationResult } = require("express-validator")

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/tarefas", (req, res) => {
  getTodasTarefas().then((result) => {
    res.json(result)
  })
})

app.get("/tarefas/:id", (req, res) => {
  const idTarefa = req.params.id
  getTarefa(idTarefa).then((result) => {
    res.json(result)
  })
})

app.get("/criar", (req, res) => {
  res.sendFile(path.join(__dirname, "criar_tarefa.html"))
})

app.post(
  "/criar",
  body("tarefa").isLength({ min: 1, max: 50 }),
  body("data").isDate(),
  (req, res) => {
    let formData = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    salvarTarefa(formData).then(() => {
      res.redirect("/")
    })
  }
)

app.listen(5000, () => {
  console.log("Server rodando na porta 5000")
})

const getTodasTarefas = () => {
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

const getTarefa = (id) => {
  const conn = require("./db_connection")
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM tarefas WHERE ID=?", [id], (err, result, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

const salvarTarefa = (formData) => {
  const conn = require("./db_connection")
  return new Promise((resolve, reject) => {
    conn.query(
      "INSERT INTO tarefas (tarefa, data) VALUES (?, ?)",
      [formData.tarefa, formData.data],
      (err, result, fields) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}
