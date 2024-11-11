import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { TodoList } from "./components/TodoList";
// import UserLogin from "./components/UserLogin";
import TrashIcon from "./components/icons/icons.svg";
import Modal from "./components/Modal";
import Appcss from "./App.css";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from './firebase'; // Importar auth y provider de Google

const KEY = "todoApp.todos";

export default function App() {
  const [todos, setTodos] = useState([{ id: 1, talks: "", completed: false }]);

  const todoTaskRef = useRef();

  useEffect(() => {
    if (todos && typeof window !== "undefined") {
      localStorage.setItem(KEY, JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newtodo = [...todos];
    const todo = newtodo.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newtodo);
  };

  const handleAdd = () => {
    const talks = todoTaskRef.current.value;
    if (talks === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), talks, completed: false }];
    });
    todoTaskRef.current.value = "";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleClearAll = () => {
    const homeworks = todos.some((todo) => todo.completed);

    if (todos.length === 0) {
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

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción borrará todas las tareas completadas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
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

  const handleSave = () => {
    //talks es la propiedad donde estás guardando las tareas
    const isEmpty = todos.every((todo) => todo.talks.trim() === "");
    //Si todas las tareas están vacías, la variable isEmpty será true
    if (!todos || todos.length === 0 || isEmpty) {
      Swal.fire({
        icon: "error",
        text: "Tu lista esta vacia!",
        confirmButtonText: "Ok",
      });
      return;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(todos));
      Swal.fire({
        icon: "success",
        text: "Lista guardada con éxito!",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      console.error("Error guardando en localStorage:", error);
      Swal.fire({
        icon: "error",
        text: "Error guardando la lista!",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="conteiner">
      <Fragment>
        <input
          ref={todoTaskRef}
          maxLength="50"
          className="input"
          type="text"
          placeholder="nueva tarea..."
          onKeyDown={handleKeyPress}
        />

        <button onClick={handleAdd} className="buttonAdd">
          AGREGAR
        </button>

        <div className="listConteiner">
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
        <button onClick={handleSave} className="btnSaveChanges">
          Guardar Lista
        </button>
        <button onClick={handleClearAll} className="buttonTrash">
          <img src={TrashIcon} alt="Trash Icon" />
        </button>
      </Fragment>
      <div className="title">
        Te quedan {todos.slice(1).filter((todo) => !todo.completed).length}{" "}
        tareas por completar
      </div>
      {/* <Modal/> */}
    </div>
  );
}
