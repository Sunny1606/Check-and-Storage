const express = require('express');
const Todo = require('../models/Todo'); // Modelo de tareas
const auth = require('../middleware/auth'); // Middleware de autenticación
const router = express.Router();

// Vamos a crear las rutas para manejar las tareas de los usuarios. Para esto, necesitamos una forma de proteger las rutas, para que solo los usuarios autenticados puedan acceder a sus tareas.

// Ruta para guardar una tarea (requiere autenticación)
router.post('/todos', auth, async (req, res) => {
  const { task } = req.body;

  try {
    const newTodo = new Todo({
      task,
      userId: req.user.userId, // El userId viene del token JWT
    });

    await newTodo.save();
    res.status(201).json({ message: 'Tarea guardada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la tarea' });
  }
});

// Ruta para obtener las tareas del usuario
router.get('/todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
});

module.exports = router;
