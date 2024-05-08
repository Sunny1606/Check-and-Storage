import React from "react";
import TodoItem from "./TodoItem";

//se esta mapeando la Lista e imprimiendo un  componente por cada elemento del array. Necesita de la Key para que reconozca en concreto ese componente.

export function TodoList({ todos , toggleTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem  key={todo.id} todo= {todo} toggleTodo={toggleTodo}/>
      ))}
    </ul>
  );
}
