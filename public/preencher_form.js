let queryString = new URLSearchParams(window.location.search)
let idTarefa = queryString.get("id")

fetch(`/tarefas?id=${idTarefa}`)
  .then(response => response.json())
  .then(tarefa => preencherForm(tarefa[0]))

let preencherForm = (tarefa) => {
  document.getElementById("tarefa").setAttribute("value", `${tarefa["tarefa"]}`)
  
  let data = new Date(Date.parse(tarefa["data"]))
  let mes = (data.getMonth() + 1).toString().padStart(2, '0')
  let dia = data.getDate().toString().padStart(2, '0');

  let dataFormatada = `${data.getFullYear()}-${mes}-${dia}`
  
  document.getElementById("data").setAttribute("value", dataFormatada)

  let form = document.getElementsByTagName("form")[0]
  form.action = `/tarefas/alterar?id=${idTarefa}&_method=PUT`
}