fetch("tarefas")
  .then((response) => response.json())
  .then((data) => renderTarefas(data))

let renderTarefas = (tarefasJSON) => {
  const divTarefas = document.getElementsByClassName("tarefas")[0]
  if (tarefasJSON.length == 0) {
    divTarefas.innerHTML = "sem tarefas"
  } else {
    let listaTarefas = document.createElement("ul")
    divTarefas.appendChild(listaTarefas)
    tarefasJSON.forEach((obj) => {
      let tarefa = document.createElement("li")

      let dataFormatada = new Date(Date.parse(obj["data"]))
      dataFormatada = `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()}`

      let tarefaLink = document.createElement("a")
      tarefaLink.href = `/tarefas/${obj["ID"]}`
      tarefaLink.innerHTML = `${obj["tarefa"]} - ${dataFormatada}`

      tarefa.appendChild(tarefaLink)
      listaTarefas.appendChild(tarefa)

      let tarefaAlterarLink = document.createElement("a")
      tarefaAlterarLink.href = `/tarefas/${obj["ID"]}/alterar`
      tarefaAlterarLink.innerHTML = "Alterar"

      let tarefaDeletarLink = document.createElement("a")
      tarefaDeletarLink.href = `/tarefas/${obj["ID"]}/deletar`
      tarefaDeletarLink.innerHTML = "Deletar"

      tarefa.appendChild(tarefaAlterarLink)
      tarefa.appendChild(tarefaDeletarLink)
    })
  }
}
