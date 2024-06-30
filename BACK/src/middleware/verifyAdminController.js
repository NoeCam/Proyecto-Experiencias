import getPool from "../database/getPool.js";

// Middleware para verificar si el usuario es administrador
const verifyAdmin = (req, res, next) => {
    const isAdmin = req.headers['x-admin']; 
    if (isAdmin === 'true') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }
  };

export default verifyAdmin;