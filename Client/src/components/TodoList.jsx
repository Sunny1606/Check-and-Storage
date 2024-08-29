import React from "react";
import TodoItem from "./TodoItem";

//se esta mapeando la Lista e imprimiendo un  componente por cada elemento del array. Necesita de la Key para que reconozca en concreto ese componente.
//toggleTodo es recibido por props para que la lista reconozca el cambio del estado completed 

//Cada TodoItem recibe las props key, todo y toggleTodo. La key se utiliza para ayudar a React a identificar qué elementos han cambiado, se agregado o se eliminado. todo se pasa directamente al componente TodoItem para representar una tarea específica, y toggleTodo se pasa para que cada TodoItem pueda modificar el estado de completado de su tarea asociada.
export function TodoList({ todos , toggleTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        // Verificar si la tarea tiene un contenido antes de renderizarla
        // Si la tarea no tiene contenido, no se renderizará el componente TodoItem
        todo.talks.trim() !== "" && (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        )
      ))}
    </ul>
  );
}
