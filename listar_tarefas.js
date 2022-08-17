fetch("tarefas")
  .then(response => response.json())
  .then(data => renderTarefas(data))

let renderTarefas = (tarefasJSON) => {
  const divTarefas = document.getElementsByClassName("tarefas")[0]
  if (tarefasJSON.length == 0) {
    divTarefas.innerHTML = "sem tarefas"
  } else {
    let listaTarefas = document.createElement("ul")
    divTarefas.appendChild(listaTarefas)
    tarefasJSON.forEach(obj => {
      let tarefa = document.createElement("li")

      let tarefaText = document.createElement("p")
      tarefaText.innerHTML = obj["tarefa"]

      let tarefaData = document.createElement("p")
      let dataFormatada = new Date (Date.parse(obj["data"]))
      dataFormatada = `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()}`
      
      tarefaData.innerHTML = dataFormatada

      tarefa.appendChild(tarefaText)
      tarefa.appendChild(tarefaData)
      listaTarefas.appendChild(tarefa)
    })
  }
}