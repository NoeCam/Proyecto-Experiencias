//*************** Dependencias ********************************/
import express from 'express';

//*************** Funciones controladoras intermedias *********/
import { adminEntryController, experienciaSchema } from '../controllers/entries/adminEntryController.js';

//*************** Funciones controladoras finales *************/
import experiencesListController from '../controllers/entries/experiencesListController.js'

const router = express.Router();

// Ruta de ejemplo BORRAR
router.get('/entries', (req, res) => {res.send('Soy rutas de entrada')});

// Endpoint para la creación de experiencia de Admin
router.post('/experiencias', adminEntryController, (req, res) => {
    const { error } = experienciaSchema.validate(req.body);
});

// Obtención de la lista de experiencias
router.get('/experiencias', experiencesListController);


export default router;

