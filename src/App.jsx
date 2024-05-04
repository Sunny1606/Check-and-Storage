import React, { Fragment } from "react";
import { TodoList } from "./components/TodoList";
import TrashIcon from "./components/icons/icons.svg";
import Appcss from "./App.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  //el estado cambia y se modifica lo que hace que al agregar una nueva tarea las demas no se borren, reenderiza el componente una y otra vez
  const [todos, setTodos] = useState([
    { id: 1, talks: "tarea 1", completed: false },
  ]);

  //useRef se define para actualizar un valor a la prop current myRef.current = newValue . para mantener valores que no desencadenen una nueva renderización cada vez que cambien.
  const todoTaskRef = useRef();

  //funcion para Agregar , funcion de boton
  const handleAdd = () => {
    const taskRef = todoTaskRef.current.value; //obtener el valor actual del input

    todoTaskRef.current.value = '';

    //comprueba que si es un string vacio se salga
    if (taskRef === "") return;

    //agregarlo al array [todos] usando para eso la funcion setTodos
    //!! React para realizar un cambio del estado , tiene que traer la copia del estado previa y luego lo cambia o modifica. No puede cambiarlo directamente -
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), taskRef, completed: false }];
    });
    //para solucionar problema de Id se instala lo mejor es uuid y se importa.
  };

  return (
    <Fragment>
      <input ref={todoTaskRef} className="input" type="text" placeholder="nueva tarea..." />


      <button onClick={handleAdd} className="buttonAdd">
        AGREGAR
      </button>

      <button className="buttonTrash">
        <img src={TrashIcon} alt="Trash Icon" />
      </button>
      <div>
        <TodoList todos={todos} />
      </div>
    </Fragment>
  );
}
