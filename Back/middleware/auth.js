const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, 'mi_secreto');
    req.user = decoded; // Decodifica el token y lo agrega a la solicitud
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = auth;

// Necesitarás un middleware para verificar si el usuario está autenticado usando un JWT (JSON Web Token). Este middleware extrae el token del encabezado de la solicitud, lo valida y permite que el usuario acceda a las rutas protegidas.
