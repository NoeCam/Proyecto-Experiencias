//*************** Dependencias ********************************/
import express from 'express';

//*************** Funciones controladoras intermedias *********/
import { adminEntryController, experienciaSchema } from '../controllers/entries/adminEntryController.js';

//*************** Funciones controladoras finales *************/
import experienciesListController from '../controllers/entries/experienciesListController.js'

const router = express.Router();

// Ruta de ejemplo BORRAR
router.get('/entries', (req, res) => {res.send('Soy rutas de entrada')});

//*************** Listado de experiencias *********************/
router.get('/entries', experienciesListController);

// Endpoint para la creación de experiencia de Admin
router.post('/experiencias', adminEntryController, (req, res) => {
    const { error } = experienciaSchema.validate(req.body);
});



export default router;

