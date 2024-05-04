import React from "react";

export default function TodoItem({ todo }) {
  //recibe props de TodoList {todo}={id, talks, complete} y las usa
  //  destructuring de las props 
  // TodoItem es un <li> porque su padre TodoList usa <ul/> 

  const { id, talks, complete } = todo;

  return <li>{talks}</li>;
}
