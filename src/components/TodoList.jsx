import React from "react";

export function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li>
          <li class="list-group-item">
            <input type="checkbox" />
          </li>
          <li class="list-group-item">
            <input type="checkbox" />
          </li>
          <li class="list-group-item">
            <input type="checkbox" />
          </li>
          <li class="list-group-item">
            <input type="checkbox" />
          </li>
          <li class="list-group-item">
            <input type="checkbox" />
          </li>
        </li>
      ))}
    </ul>
  );
}
