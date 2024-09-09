import React, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import TrashIcon from "./components/icons/icons.svg";
import Appcss from "./App.css";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
// import { signInWithPopup } from 'firebase/auth';
// import { auth, provider } from './firebase'; // Importar auth y provider de Google

const KEY = "todoApp.todos";

export default function App() {
  const [todos, setTodos] = useState([{ id: 1, talks: "", completed: false }]);
  // Eliminar el estado para manejar el modal
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const todoTaskRef = useRef();
  // const navigate = useNavigate();

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

  // Función para manejar el inicio de sesión con Google
  // const handleGoogleLogin = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log('Usuario autenticado con Google:', user);
  //       // Puedes guardar la información del usuario o redirigir
  //     })
  //     .catch((error) => {
  //       console.error('Error en la autenticación con Google:', error);
  //     });
  // };

  const handleSave = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      // handleGoogleLogin(); // Inicia el proceso de autenticación con Google si no está autenticado
      return;
    }
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(todos),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la lista");
      }

      Swal.fire({
        title: "Guardado",
        text: "Tu lista ha sido guardada con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className="conteiner">
      <Fragment>
        <input
          ref={todoTaskRef}
          maxlength="50"
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
    </div>
  );
}
