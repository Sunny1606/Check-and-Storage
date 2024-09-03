const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/users');
const todo = require('./routes/todo');
const app = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

// Usar las rutas
app.use('/api/users', user); // Rutas de usuarios
app.use('/api', todo); // Rutas de tareas

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
