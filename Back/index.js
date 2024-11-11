// En tu archivo de servidor (e.g., server.js)
const express = require('express');
const mongoose = require('mongoose');
const Lista = require('./models/Todo'); // Asegúrate de ajustar la ruta de importación
const app = express();

mongoose.connect('mongodb://localhost:27017/nombreDeTuBaseDeDatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Ruta para obtener todas las listas
app.get('/api/listas', async (req, res) => {
  try {
    const listas = await Lista.find();
    res.json(listas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las listas' });
  }
});

