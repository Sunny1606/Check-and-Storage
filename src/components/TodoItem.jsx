import React from "react";

export default function TodoItem({ todo, toggleTodo }) {
  //recibe props de TodoList {todo}={id, talks, complete} y las usa
  //  destructuring de las props
  // TodoItem es un <li> porque su padre TodoList usa <ul/>

  //significa que se está llamando a la función toggleTodo que se pasa como prop al componente TodoItem, y se le pasa el id de la tarea como argumento.es el controlador de eventos que se activa cuando se hace clic en el checkbox y se encarga de cambiar el estado de completado de la tarea correspondiente.
  const handleTodoClick = () => {
    toggleTodo(id);
  };

  const { id, talks, complete } = todo;

  return (
    <li>
      <input type="checkbox" checked={complete} onChange={handleTodoClick} />
      {talks}
    </li>
  );
}
