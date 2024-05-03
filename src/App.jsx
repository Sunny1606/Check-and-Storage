import React from "react";
import { TodoList } from "./components/TodoList";
import TrashIcon from "./components/icons/icons.svg";
import Appcss from "./App.css"

export default function App() {
  return (
    <div className="divConteiner">
      <input className="input" placeholder="nueva tarea..."/>
      <button className="buttonAdd">AGREGAR</button>

      <button className="buttonTrash">
        <img src={TrashIcon} alt="Trash Icon" />
      </button>

      <div>
      <TodoList todos={[{ id: 1, talks: "tarea 1", completed: false }]} />
      </div>
    </div>
  );
}
