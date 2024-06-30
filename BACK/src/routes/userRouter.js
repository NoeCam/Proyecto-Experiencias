import express from 'express';
import registerUser from '../controllers/users/registerUser.js';
import loginUserController from '../controllers/users/loginUserController.js';

const router = express.Router();

router.get('/users', (req, res) => {res.send('Soy rutas de usuarios')});

router.get('/', (req, res) => { res.send('¡Bienvenido al servidor de Experiencias Diferentes!')});

router.post("/register", registerUser);
// Ruta para el login de usuario
router.post('/login', loginUserController);  // Añadido el endpoint de login


export default router;