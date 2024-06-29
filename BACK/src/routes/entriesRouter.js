//*************** Dependencias ********************************/
import express from 'express';

//*************** Funciones controladoras intermedias *********/

//*************** Funciones controladoras finales *************/
import experienciesListController from '../controllers/entries/experienciesListController.js'

const router = express.Router();

// Ruta de ejemplo BORRAR
router.get('/entries', (req, res) => {res.send('Soy rutas de entrada')});

//*************** Listado de experiencias *********************/
router.get('/entries', experienciesListController);

export default router;