import React, { Fragment, useEffect } from "react";
import { TodoList } from "./components/TodoList";
import TrashIcon from "./components/icons/icons.svg";
// eslint-disable-next-line no-unused-vars
import Appcss from "./App.css";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const KEY = "todoApp.todos";

export default function App() {
  //para manejar el checkbox del input
  //estado actual en false
  //el estado cambia y se modifica lo que hace que al agregar una nueva tarea las demas no se borren, reenderiza el componente una y otra vez

  const [todos, setTodos] = useState([{ id: 1, talks: "", completed: false }]);

  //useRef se define para actualizar un valor a la prop current myRef.current = newValue . para mantener valores que no desencadenen una nueva renderización cada vez que cambien.
  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  //Localstorage: solo puede almacenar cadenas de texto/ esto es para guardar y al recargar no borre los datos ingresados por el usuario/ salvando el array de todos.
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  //resumen: toggleTodo sirve para los checkbox , para modificar de true a falsa o al reves, el estado de la prop completed.
  const toggleTodo = (id) => {
    //crea una copia del array y lo guarda en newtodo
    const newtodo = [...todos];
    //busca en el array el id , para identificarlo y lo guarda en todo
    const todo = newtodo.find((todo) => todo.id === id);
    //a la propiedad completed.
    todo.completed = !todo.completed;
    //se le pasa el nuevo array que hicimos al setTodos y lo guarda
    setTodos(newtodo);
  };

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

  //evento para funcionalidad de la t4ecla "enter" 
  const handleKeyPress = (event)  => {
    if (event.key === "Enter") {
      handleAdd();   //llama a handleAdd cuando se presiona Enter
    }
  }

  const handleClearAll = () => {
    // Verifica si hay tareas completadas
    const homeworks = todos.some((todo) => todo.completed);

    if (todos.length === 0) {
      // Si no hay tareas en total, muestra una alerta indicando que no hay tareas
      Swal.fire({
        title: "No hay tareas",
        text: "No hay tareas para borrar.",
        icon: "info",
        confirmButtonText: "Ok",
      });
      return;
    } else if (!homeworks) {
      Swal.fire({
        title: "No hay tareas completadas",
        text: "No hay tareas completadas para borrar.",
        icon: "info",
        confirmButtonText: "Ok",
      });
      return;
    }

    // Muestra la alerta de confirmación correctamente
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción borrará todas las tareas completadas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, filtra las tareas completadas
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
        Swal.fire(
          "Borrado con éxito!",
          "Las tareas completadas han sido borradas.",
          "success"
        );
      }
    });
  };

  return (
    <div className="conteiner">
      <Fragment>
        <input
          ref={todoTaskRef}
          className="input"
          type="text"
          placeholder="nueva tarea..."
          onKeyDown={handleKeyPress}
        />

        <button onClick={handleAdd} className="buttonAdd">
          AGREGAR
        </button>

        <button onClick={handleClearAll} className="buttonTrash">
          <img src={TrashIcon} alt="Trash Icon" />
        </button>

        <div className="listConteiner">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
      </Fragment>
      <div className="title">
        Te quedan {todos.slice(1).filter((todo) => !todo.completed).length}{" "}
        tareas por completar
      </div>
    </div>
  );
}

//filtra las tareas que no están completadas y luego cuenta cuántas hay.

//RECORDATORIO
//las propiedades van desde arriba hacia al ultimo componente, y los eventos vuelven hacia el principio de arriba.
