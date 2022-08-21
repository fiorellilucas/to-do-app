const root = ReactDOM.createRoot(document.getElementById("root"))

let queryString = new URLSearchParams(window.location.search)
let idTarefa = queryString.get("id")

fetch(`/tarefas?id=${idTarefa}`)
  .then(response => response.json())
  .then(tarefa => root.render(<App tarefa={tarefa[0]} />))

let App = (props) => {
  if (idTarefa == null) {
    return (
      <FormTarefaCriar />
    )
  } else {
    return (
      <FormTarefaAlterar tarefa={props.tarefa}/>
    )
  }
}

let FormTarefaCriar = () => {
  return (
    <form action="criar" method="POST">
      <label htmlFor="titulo">Título</label>
      <input type="text" id="tarefa" name="tarefa" />
      <label htmlFor="data">Selecione uma data</label>
      <input type="date" name="data" id="data" />
      <input type="submit" value="Criar tarefa" />
    </form>
  )
}

let FormTarefaAlterar = (props) => {
  let tarefa = props.tarefa

  let data = new Date(Date.parse(tarefa.data))
  let mes = (data.getMonth() + 1).toString().padStart(2, '0')
  let dia = data.getDate().toString().padStart(2, '0');

  let dataFormatada = `${data.getFullYear()}-${mes}-${dia}`

  return (
    <form action={`/alterar?id=${idTarefa}&_method=PUT`} method="POST">
      <label htmlFor="titulo">Título</label>
      <input type="text" id="tarefa" name="tarefa" defaultValue={tarefa.tarefa} />
      <label htmlFor="data">Selecione uma data</label>
      <input type="date" name="data" id="data" defaultValue={dataFormatada}/>
      <input type="submit" value="Alterar tarefa" />
    </form>
  )
}
