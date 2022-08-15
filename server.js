const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"))
})

app.route("/criar")
  .get((req, res) => {
    res.sendFile(path.join(__dirname, "/criar_tarefa.html"))
  })
  .post((req, res) => {
    console.log("salva tarefa no bd")
  })

app.route("/tarefa/:id")
  .get((req, res) => {
    console.log("detalhe da tarefa")
  })
  .put((req, res) => {
    console.log("alterar tarefa")
  })
  .delete((req, res) => {
    console.log("deletar tarefa")
  })

app.listen(port, () => {
  console.log(`server rodando na porta ${port}`)
})
