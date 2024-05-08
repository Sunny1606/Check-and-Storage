import React, { Fragment } from "react";
import { TodoList } from "./components/TodoList";
import TrashIcon from "./components/icons/icons.svg";
import Appcss from "./App.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  //para manejar el checkbox del input
  //estado actual en false

  const toggleTodo = (id) => {
    //crea una copia del array y lo guarda en newtodo
    const newtodo = [...todos];
    //busca en el array el id , para identificarlo y lo guarda en todo
    const todo = newtodo.find((todo) => todo.id === id);
    //a la propiedad completed
    todo.completed = !todo.completed;
    //se le pasa el nuevo array que hicimos al setTodos y lo guarda
    setTodos(newtodo);
  };

  //el estado cambia y se modifica lo que hace que al agregar una nueva tarea las demas no se borren, reenderiza el componente una y otra vez
  const [todos, setTodos] = useState([
    { id: 1, talks: "Tarea 1", completed: false },
  ]);

  //useRef se define para actualizar un valor a la prop current myRef.current = newValue . para mantener valores que no desencadenen una nueva renderización cada vez que cambien.
  const todoTaskRef = useRef();

  //funcion para Agregar , funcion de boton
  const handleAdd = () => {
    const talks = todoTaskRef.current.value; //obtener el valor actual del input
    //comprueba que si es un string vacio se salga
    if (talks === "") return;
    //agregarlo al array [todos] usando para eso la funcion setTodos
    //!! React para realizar un cambio del estado , tiene que traer la copia del estado previa y luego lo cambia o modifica. No puede cambiarlo directamente -
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), talks, completed: false }];
    });
    //para solucionar problema de Id se instala lo mejor es uuid y se importa.

    todoTaskRef.current.value = ""; // limpia el input
  };

  return (
    <Fragment>
      <input
        ref={todoTaskRef}
        className="input"
        type="text"
        placeholder="nueva tarea..."
      />

      <button onClick={handleAdd} className="buttonAdd">
        AGREGAR
      </button>

      <button className="buttonTrash">
        <img src={TrashIcon} alt="Trash Icon" />
      </button>
      <div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>
    </Fragment>
  );
}
