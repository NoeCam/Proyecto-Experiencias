import express from 'express';

const router = express.Router();

router.get('/users', (req, res) => {res.send('Soy rutas de usuarios')});

router.get('/', (req, res) => { res.send('¡Bienvenido al servidor de Experiencias Diferentes!')});

router.post("/register", registerUser);
// Ruta para el login de usuario
router.post('/login', loginUserController);  // Añadido el endpoint de login


export default router;