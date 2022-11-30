import { useState } from "react";
import {
  InputContainer,
  ListaContainer,
  ListaTarefasContainer,
  Tarefa,
  TaskInput,
  AddTaskButton,
  RemoveButton,
  LinhaHorizontal
} from "./styled";
import bin from "../../assets/bin.png";
import ListaTarefasConcluidas from "../ListaTarefasConcluidas/index";

export function ListaTarefas() {
  const [lista, setLista] = useState(["Fazer exercícios", "Estudar React"]);
  const [novaTarefa, setNovaTarefa] = useState("");
  // criando novo estado para adicionar tarefas completas
  const [completas, setCompletas] = useState([]);

  const onChangeTarefa = (event) => {
    setNovaTarefa(event.target.value);
  };

  const adicionaTarefa = () => {
    const novaLista = [...lista, novaTarefa];
    setLista(novaLista);
    setNovaTarefa("");
  };
  // criando função para adicionar tarefas apartir de uma teclas pressionada
  const adicionaTarefaEnter = (event) => {
    if (event.keyCode === 13) {
      adicionaTarefa();
    }
  };
  const removeTarefa = (tarefa) => {
    const listaFiltrada = lista.filter((item) => item !== tarefa);
    setLista(listaFiltrada);
    // criando lista para receber tarefas completas
    const listaCompleta = [...completas, tarefa];
    setCompletas(listaCompleta);
  };

  return (
    <ListaTarefasContainer>
      <InputContainer>
        <TaskInput
          placeholder="Digite aqui uma tarefa"
          value={novaTarefa}
          onChange={onChangeTarefa}
          onKeyUp={adicionaTarefaEnter}
        />
        <AddTaskButton onClick={adicionaTarefa}>Adicionar</AddTaskButton>
      </InputContainer>
      <ListaContainer>
        <ul>
          {lista.map((tarefa, index) => {
            return (
              <Tarefa key={index}>
                <p>{tarefa}</p>
                <RemoveButton onClick={() => removeTarefa(tarefa)}>
                  <img src={bin} alt="" width="16px" />
                </RemoveButton>
              </Tarefa>
            );
          })}
        </ul>
      </ListaContainer>
      <LinhaHorizontal />
      <ListaTarefasConcluidas completas={completas} />
    </ListaTarefasContainer>
  );
}
