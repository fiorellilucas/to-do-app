fetch("tarefas")
  .then((response) => response.json())
  .then((tarefas) => root.render(<App tarefas={tarefas} />))

const root = ReactDOM.createRoot(document.getElementById("root"))

let App = (props) => {
  return (
    <div>
      <BotaoCriar />
      <ListaTarefas tarefasJSON={props.tarefas}/>
    </div>
  )
}

let Tarefa = (props) => {
  return (
    <li>
      <a href={"/tarefas?id=" + props.id}>{props.tarefa} - {props.data}</a>
      <a href={"/tarefas/alterar?id=" + props.id}>Alterar</a>
      <a href={"/tarefas/deletar?id=" + props.id}>Deletar</a>
    </li>
  )
}

let ListaTarefas = (props) => {
  let tarefasArray = []

  props.tarefasJSON.forEach((obj) => {
    let dataFormatada = new Date(Date.parse(obj["data"]))
    dataFormatada = `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()}`
    
    tarefasArray.push(<Tarefa id={obj["ID"]} tarefa={obj["tarefa"]} data={dataFormatada} />)
  })

  return (tarefasArray)
}

let BotaoCriar = () => {
  return (
    <a href="/criar">Criar Tarefa</a>
  )
}

