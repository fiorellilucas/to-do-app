const http = require("http")
const { readFileSync } = require("fs")

const homePage = readFileSync("./index.html")
const styles = readFileSync("./styles.css")
const listarTarefas = readFileSync("./listar_tarefas.js")
const criarPage = readFileSync("./criar_tarefa.html")

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" })
    res.write(homePage)
    res.end()
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" })
    res.write(styles)
    res.end()
  } else if (req.url === "/listar_tarefas.js") {
    res.writeHead(200, { "content-type": "text/javascript" })
    res.write(listarTarefas)
    res.end()
  } else if (req.url === "/tarefas") {
    res.writeHead(200, { "content-type": "application/json" })
    getTarefas().then((result) => {
      res.write(JSON.stringify(result))
      res.end()
    })
  } else if (req.url === "/criar" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/html" })
    res.write(criarPage)
    res.end()
  } else if (req.url === "/criar" && req.method === "POST") {
    req.on("data", (formData) => {

      //gambiarra total, porém funciona por ser um form simples
      formDataString = formData.toString()
      formDataArray = formDataString.split("&")
      formDataTarefa = formDataArray[0].split("=")
      formData_Data = formDataArray[1].split("=")
      formDataFormatado = {
        "tarefa": formDataTarefa[1],
        "data": formData_Data[1],
      }
      
      salvarTarefa(formDataFormatado).then(() => {
        res.writeHead(302, {
          "Location": "/"
        })
        res.end()
      })

    })
  }
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

const salvarTarefa = (tarefa) => {
  const conn = require ("./db_connection")
  return new Promise((resolve, reject) => {
    conn.query("INSERT INTO tarefas (tarefa, data) VALUES (?, ?)", [tarefa["tarefa"], tarefa["data"]], (err, result, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

server.listen(5000)
