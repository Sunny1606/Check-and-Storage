import React, { useState } from "react";

export default function List() {



  const [list, setList] = useState([]);
  const [error, setError] = useState([]);

  const mylist = async () => {
    try {
const response = await fetch ('/api')


    } catch (error) {

    }
  };

  return (
    <div>
      <button onClick={mylist} className="buttonMisT">
        Mis Tareas
      </button>
    </div>
  );
}
