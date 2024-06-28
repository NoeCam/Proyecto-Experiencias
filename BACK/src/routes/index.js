import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor de Experiencias Diferentes!');
  });

export default router;


  
